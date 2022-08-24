import { ActionMap, BotError, CallBackHandler, CommandHandler, MessageHandler } from './types';
import {
  unpackData,
  getFormattedMessage,
  getFormattedMessageBody,
  getFormattedSettingsMessage,
  getValueFromMessageBody,
} from './helpers';
import * as services from './services';
import { ACTION, commandsList, MODE } from './constants';
import bot from './index';
import { getLinks } from './api';
import {
  sendWordKeyBoard,
  settingsKeyboard,
  simpleKeyboard,
  addWordDialogKeyboard,
  periodSettingsKeyboard,
  modeSettingsKeyboard,
  startKeyboard,
  languageSettingsKeyboard,
  changeModeKeyboard,
  wordSettingsKeyboard,
} from './helpers/keyboards';

// const removePreviousMessages = async (id: number, messageId: number) => {
//   await Promise.all(
//     Array.from(Array(10).keys())
//       .map((item) => messageId - item)
//       .map(async (number) => {
//         try {
//           return await bot.deleteMessage(id, number.toString());
//         } catch (error) {
//           return null;
//         }
//       })
//   );
// };

export const sendEntireWord = async (telegramId: number) => {
  const word = await services.getUserWords(telegramId);
  const user = await services.getUser(telegramId);

  if (!user) return;

  const { mode } = user;

  if (!word) return;

  const url = getLinks(word.text).CAMBRIDGE.RU;
  const formattedMessage = getFormattedMessage(word, url);

  const hiddenMessage = `<a href="tg://btn/${word.text}">\u200b</a>`;

  const message = hiddenMessage + formattedMessage;

  await bot.sendMessage(telegramId, message, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    ...sendWordKeyBoard(telegramId, mode),
  });
};

export const showSettings = async (telegramId: number) => {
  const user = await services.getUser(telegramId);
  if (!user) return;

  const { mode, period, language } = user;

  const formattedSettings = getFormattedSettingsMessage({ mode, period, language });

  await bot.sendMessage(telegramId, formattedSettings, {
    parse_mode: 'HTML',
    ...settingsKeyboard(),
  });
};

const actionsMapping: ActionMap = {
  [ACTION.ADD_WORD_CONFIRM]: async ({ id, value }) => {
    // TODO: validating - only letters
    const word = await services.addWord(value, id);
    const formattedMessageBody = getFormattedMessageBody(word);
    await bot.sendMessage(id, `I added word "${value}" to your list\n${formattedMessageBody}`, {
      parse_mode: 'HTML',
    });
  },
  [ACTION.ADD_WORD_REFUSE]: async ({ id }) => {
    await bot.sendMessage(id, `Ok!`);
  },
  [ACTION.SETTINGS_MODE]: async ({ id }) => {
    await bot.sendMessage(id, 'You can Start or Stop word sending', modeSettingsKeyboard());
  },
  [ACTION.SETTING_PERIOD]: async ({ id }) => {
    await bot.sendMessage(id, 'Select sending period', periodSettingsKeyboard());
  },
  [ACTION.SETTING_LANGUAGE]: async ({ id }) => {
    await bot.sendMessage(id, 'Select your language', languageSettingsKeyboard());
  },
  [ACTION.NEXT_WORD]: async ({ value }) => {
    await sendEntireWord(Number(value));
  },
  [ACTION.SETTINGS_OPEN]: async ({ id }) => {
    await showSettings(id);
  },
  [ACTION.SET_MODE]: async ({ id, value }) => {
    const updatedUser = await services.updateUser({
      telegramId: id,
      mode: value,
      lastSendTime: true,
    });

    await bot.sendMessage(
      id,
      `I changed your mode to ${value}`,
      changeModeKeyboard(updatedUser.mode)
    );
  },
  [ACTION.PERIOD_SET]: async ({ id, value }) => {
    await services.updateUser({ telegramId: id, period: Number(value) });
    await bot.sendMessage(id, `I changed your period to ${value} min`);
  },
  [ACTION.SETTINGS_CLOSE]: async ({ id, value }) => {
    await services.updateUser({ telegramId: id, period: Number(value) });
    const user = await services.getUser(id);
    if (!user) throw new Error('ALARM!!! There is no user with this id!!!');
    await bot.sendMessage(id, `Mode = ${user.mode}, period = ${user.period}`, simpleKeyboard());
  },
  [ACTION.CLOSE]: async () => {},
  [ACTION.CANCEL]: async () => {},
  [ACTION.SET_WORD_FREQ]: async ({ id, value, word }) => {
    console.log('word: ', word);
    console.log('value: ', value);

  },
  [ACTION.READ_CONFIRM]: async ({ id }) => {
    await services.updateUser({ telegramId: id, mode: MODE.START, lastSendTime: true });
  },
  [ACTION.LANGUAGE_SET]: async ({ id, value }) => {
    await services.updateUser({ telegramId: id, language: value });
    await bot.sendMessage(id, `I changed your language to ${value}`);
  },
  [ACTION.WORD_ACTIONS]: async ({ id, value }) => {
    await bot.sendMessage(
      id,
      `You can do something with this word "${value}"`,
      wordSettingsKeyboard()
    );
  },
  [ACTION.REMOVE_WORD]: async ({ id, word }) => {
    await bot.sendMessage(id, `We are going to remove word ${word}`);
  },
};

export const onCallbackQuery: CallBackHandler = async (query) => {
  const entity = query.message?.entities?.length ? query.message?.entities[0] : null;
  const messageId = query.message?.message_id;
  const {
    data,
    from: { id, first_name, username },
  } = query;

  await services.addUser(id, first_name, username);

  if (!messageId) throw new Error('There is no messageId!!!');
  if (!data) throw new Error('There is no data!!!');

  const word = getValueFromMessageBody(entity);

  const { action, value } = unpackData(data);

  await actionsMapping[action as ACTION]({ id, value, word });
};

export const onStart: CommandHandler = async (msg) => {
  const { id, first_name, username } = msg.chat;

  await services.addUser(id, first_name, username);

  await bot.sendMessage(
    id,
    `Hello, ${msg.chat.username}. Choose your language please`,
    startKeyboard()
  );
};

export const onMessage: MessageHandler = async (msg) => {
  const text = msg.text;

  // const {
  //   chat: { id },
  //   message_id,
  // } = msg;

  // await removePreviousMessages(id, message_id);

  if (!text) throw new Error("I'm a little confused");

  const isWordSkippable = commandsList.reduce((acc, item) => acc || item.command === text, false);

  if (isWordSkippable) return;

  const user = await services.getUser(msg.chat.id);

  if (!user?.language) throw new BotError('Choose language at first, please');

  await bot.sendMessage(
    msg.chat.id,
    `Add word "${text}" to your list`,
    addWordDialogKeyboard(text)
  );
};

export const onTest: CommandHandler = (msg) => sendEntireWord(msg.chat.id);

export const onSettings: CommandHandler = (msg) => showSettings(msg.chat.id);
