import {
  BotError,
  CallBackHandler,
  CommandHandler,
  MessageHandler,
} from './types';
import {
  unpackData,
  getFormattedMessage,
  getFormattedSettingsMessage,
  getHiddenMessage,
  getMessageData,
} from './helpers';
import * as services from './services';
import { commandsList, SCREEN } from './constants';
import bot from './index';
import { getLinks } from './api';
import { startKeyboard, settingsKeyboard } from './helpers/keyboards';



export const sendEntireWord = async (telegramId: number, screen: string) => {
  const { word, mode } = await services.getUserWords(telegramId);

  if (!word || !mode) throw new BotError('Sorry, you have no words at all');

  const url = getLinks(word.word.text).CAMBRIDGE.RU;
  const formattedMessage = getFormattedMessage(word, url);

  const hiddenMessage = getHiddenMessage(word.word.text);

  const message = hiddenMessage + formattedMessage;

  await bot.sendMessage(telegramId, message, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    // ...sendWordKeyBoard(telegramId, mode),
  });
};

export const showSettings = async (telegramId: number) => {
  const user = await services.getUser(telegramId);
  if (!user) return;

  const { mode, period, language } = user;

  const formattedSettings = getFormattedSettingsMessage('Current settings', {
    mode,
    period,
    language,
  });

  await bot.sendMessage(telegramId, formattedSettings, {
    parse_mode: 'HTML',
    reply_markup: settingsKeyboard(),
  });
};

// const actionsMapping: ActionMap = {
//   [ACTION.ADD_WORD_CONFIRM]: async ({ id, value }) => {
//     // TODO: validating - only letters
//     // const word = await services.addWord(value, id);
//     // const formattedMessageBody = getFormattedMessageBody(word);
//     // await bot.sendMessage(id, `I added word "${value}" to your list\n${formattedMessageBody}`, {
//     //   parse_mode: 'HTML',
//     // });
//   },
//   [ACTION.ADD_WORD_REFUSE]: async ({ id }) => {
//     // await bot.sendMessage(id, `Ok!`);
//   },
//   [ACTION.SETTINGS_MODE]: async ({ id }) => {
//     // await bot.sendMessage(id, 'You can Start or Stop word sending', modeSettingsKeyboard());
//   },
//   [ACTION.SETTING_PERIOD]: async ({ id }) => {
//     // await bot.sendMessage(id, 'Select sending period', periodSettingsKeyboard());
//   },
//   [ACTION.SETTING_LANGUAGE]: async ({ id }) => {
//     // await bot.sendMessage(id, 'Select your language', languageSettingsKeyboard());
//   },
//   [ACTION.NEXT_WORD]: async ({ id }) => {
//     // await sendEntireWord(Number(id));
//   },
//   [ACTION.SETTINGS_OPEN]: async ({ id }) => {
//     // await showSettings(id);
//   },
//   [ACTION.SET_MODE]: async ({ id, value, messageData }) => {
//     // const updatedUser = await services.updateUser({
//     //   telegramId: id,
//     //   mode: value,
//     //   lastSendTime: true,
//     // });
//     // await bot.sendMessage(
//     //   id,
//     //   `I changed your mode to ${value}`,
//     //   changeModeKeyboard(updatedUser.mode)
//     // );
//   },
//   [ACTION.PERIOD_SET]: async ({ id, value }) => {
//     // await services.updateUser({ telegramId: id, period: Number(value) });
//     // await bot.sendMessage(id, `I changed your period to ${value} min`);
//   },
//   [ACTION.SETTINGS_CLOSE]: async ({ id, value }) => {
//     // await services.updateUser({ telegramId: id, period: Number(value) });
//     // const user = await services.getUser(id);
//     // if (!user) throw new Error('ALARM!!! There is no user with this id!!!');
//     // await bot.sendMessage(id, `Mode = ${user.mode}, period = ${user.period}`, simpleKeyboard());
//   },
//   [ACTION.CLOSE]: async () => {},
//   [ACTION.CANCEL]: async () => {},
//   [ACTION.SET_WORD_FREQ]: async ({ id, value, messageData }) => {
//     // await services.updateWordFrequency(id, messageData.word, value);
//     // await bot.sendMessage(id, 'We are going to change word frequency');
//   },
//   [ACTION.READ_CONFIRM]: async ({ id }) => {
//     // await services.updateUser({ telegramId: id, mode: MODE.START, lastSendTime: true });
//   },
//   [ACTION.LANGUAGE_SET]: async ({ id, value }) => {
//     // await services.updateUser({ telegramId: id, language: value });
//     // await bot.sendMessage(id, `I changed your language to ${value}`);
//   },
//   [ACTION.WORD_ACTIONS]: async ({ id, messageData }) => {
//     // await bot.sendMessage(
//     //   id,
//     //   `You can do something with this word "${messageData.word}"`,
//     //   wordSettingsKeyboard()
//     // );
//   },
//   [ACTION.REMOVE_WORD]: async ({ id, messageData }) => {
//     // await bot.sendMessage(id, `We are going to remove word ${messageData.word}`);
//   },
// };

export const onCallbackQuery: CallBackHandler = async (query) => {
  const messageId = query.message?.message_id;
  const chatId = query.message?.chat.id;

  const {
    data,
    from: { id, first_name, username },
  } = query;

  const user = await services.getUser(id);

  await services.addUser(id, first_name, username);

  if (!messageId) throw new Error('There is no messageId!!!');
  if (!data) throw new Error('There is no data!!!');
  if (!user) throw new Error('There is no user!!!');

  const { button, value, screen } = unpackData(data);

  const messageData = getMessageData(button, value, screen, user);

  try {
    await bot.editMessageText(messageData.message, {
      ...messageData.options,
      message_id: messageId,
      chat_id: chatId,
    });
  } catch (error) {}
};

export const onStart: CommandHandler = async (msg) => {
  const { id, first_name, username } = msg.chat;
  await services.addUser(id, first_name, username);

  await bot.sendMessage(id, `Hello, ${msg.chat.username}`, {
    reply_markup: startKeyboard(SCREEN.SETTINGS),
  });
};

export const onMessage: MessageHandler = async (msg) => {
  const text = msg.text;

  if (!text) throw new Error("I'm a little confused");

  const isWordSkippable = commandsList.reduce((acc, item) => acc || item.command === text, false);

  if (isWordSkippable) return;

  const user = await services.getUser(msg.chat.id);
  if (!user?.language) throw new BotError('Choose language at first, please');

  // await bot.sendMessage(
  //   msg.chat.id,
  //   `Add word "${text}" to your list`,
  //   addWordDialogKeyboard(text)
  // );
};

export const onTest: CommandHandler = (msg) => sendEntireWord(msg.chat.id, 'WORD:COMMON');

export const onSettings: CommandHandler = (msg) => showSettings(msg.chat.id);
