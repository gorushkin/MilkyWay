import { BotError, CallBackHandler, CommandHandler, MessageHandler } from './types';
import {
  unpackData,
  getFormattedMessage,
  getFormattedSettingsMessage,
  getHiddenMessage,
  getMessageData,
  getValueFromMessageBody,
} from './helpers';
import * as services from './services';
import { ACTION, commandsList } from './constants';
import bot from './index';
import { getLinks } from './api';
import { startKeyboard, settingsKeyboard, addWordDialogKeyboard } from './helpers/keyboards';

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
    reply_markup: settingsKeyboard,
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
//   [ACTION.SET_WORD_FREQ]: async ({ id, value, messageData }) => {
//     // await services.updateWordFrequency(id, messageData.word, value);
//     // await bot.sendMessage(id, 'We are going to change word frequency');
//   },
//   [ACTION.READ_CONFIRM]: async ({ id }) => {
//     // await services.updateUser({ telegramId: id, mode: MODE.START, lastSendTime: true });
//   },
//   [ACTION.WORD_ACTIONS]: async ({ id, messageData }) => {
//     // await bot.sendMessage(
//     //   id,
//     //   `You can do something with this word "${messageData.word}"`,
//     //   wordSettingsKeyboard()
//     // );
//   },

// };

const mapping = {
  [ACTION.DEFAULT]: async (_value: string, _id: number) => {
    console.log('DEFAULT');
  },
  [ACTION.ADD_WORD]: async (_value: string, _id: number) => {
    console.log('ADD_WORD');
  },
  [ACTION.SET_LANGUAGE]: async (value: string, telegramId: number) => {
    return services.updateUser({ telegramId, language: value });
  },
  [ACTION.SET_MODE]: async (value: string, telegramId: number) => {
    return services.updateUser({ telegramId, mode: value });
  },
  [ACTION.SET_PERIOD]: async (value: string, telegramId: number) => {
    return services.updateUser({ telegramId, period: Number(value) });
  },
  [ACTION.ADD_WORD_CONFIRM]: async (value: string, telegramId: number) => {
    console.log('ADD_WORD_CONFIRM');
    console.log('value: ', value);
    // return services.updateUser({ telegramId, period: Number(value) });
  },
  [ACTION.ADD_WORD_REFUSE]: async (value: string, telegramId: number) => {
    console.log('ADD_WORD_REFUSE');
    console.log('value: ', value);
    // return services.updateUser({ telegramId, period: Number(value) });
  },
};

export const onCallbackQuery: CallBackHandler = async (query) => {
  const messageId = query.message?.message_id;
  const chatId = query.message?.chat.id;

  const {
    data,
    from: { id, first_name, username },
  } = query;

  const user = await services.getUser(id);

  // TODO: remove user creation from this place
  await services.addUser(id, first_name, username);

  const settingsActions = [ACTION.SET_LANGUAGE, ACTION.SET_MODE, ACTION.SET_PERIOD];

  if (!messageId) throw new Error('There is no messageId!!!');
  if (!data) throw new Error('There is no data!!!');
  if (!user) throw new Error('There is no user!!!');

  const { button, value, screen, action } = unpackData(data);

  const result = await mapping[action as ACTION](value, id);

  const updatedUser = settingsActions.includes(action) ? result ?? user : user;

  const hiddenValue = query.message?.entities
    ? getValueFromMessageBody(query?.message?.entities[0])
    : '';

  const messageData = getMessageData(button, value ? value : hiddenValue, screen, updatedUser);

  try {
    await bot.editMessageText(messageData.message, {
      ...messageData.options,
      message_id: messageId,
      chat_id: chatId,
    });
  } catch (error) {
    console.log('error: ', error);
  }
};

export const onStart: CommandHandler = async (msg) => {
  const { id, first_name, username } = msg.chat;
  await services.addUser(id, first_name, username);

  await bot.sendMessage(id, `Hello, ${msg.chat.username}`, {
    reply_markup: startKeyboard,
  });
};

export const onMessage: MessageHandler = async (msg) => {
  const text = msg.text;

  if (!text) throw new Error("I'm a little confused");

  const isWordSkippable = commandsList.reduce((acc, item) => acc || item.command === text, false);

  if (isWordSkippable) return;

  const hiddenMessage = getHiddenMessage(text);
  const message = `${hiddenMessage}Add word "${text}" to your list`;

  await bot.sendMessage(msg.chat.id, message, {
    reply_markup: addWordDialogKeyboard,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  });
};

export const onTest: CommandHandler = (msg) => sendEntireWord(msg.chat.id, 'WORD:COMMON');

export const onSettings: CommandHandler = (msg) => showSettings(msg.chat.id);
