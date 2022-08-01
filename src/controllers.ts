import { ActionMap, CallBackHandler, CommandHandler, MessageHandler } from './types';
import { unpackData, formateMessage } from './helpers';
import { services } from './services';
import { ACTION, commandsList } from './constants';
import bot from './index';
import { getLinks } from './api';
import {
  sendWordKeyBoard,
  settingsKeyboard,
  simpleKeyboard,
  addWordDialogKeyboard,
  periodSettingsKeyboard,
  modeSettingsKeyboard,
} from './helpers/keyboards';

export const sendWord = async (telegramId: number) => {
  const word = await services.getUserWords(telegramId);

  if (!word) return;

  const formattedMessage = formateMessage(word);

  const url = getLinks(word.text).CAMBRIDGE.RU;

  bot.sendMessage(telegramId, formattedMessage, {
    parse_mode: 'HTML',
    ...sendWordKeyBoard(url, telegramId),
  });
};

export const showSettings = (telegramId: number) => {
  bot.sendMessage(telegramId, 'Settings', settingsKeyboard());
};

const actonsMapping: ActionMap = {
  [ACTION.ADD_WORD_CONFIRM]: async ({ id, value }) => {
    // TODO: validating - only letters
    await services.addWord(value, id);
    bot.sendMessage(id, `I added word "${value}" to your list`, simpleKeyboard());
  },
  [ACTION.ADD_WORD_REFUSE]: async ({ id }) => {
    bot.sendMessage(id, `Ok!`, simpleKeyboard());
  },
  [ACTION.SETTINGS_MODE]: async ({ id }) => {
    bot.sendMessage(id, 'You can Start or Stop word sending', modeSettingsKeyboard());
  },
  [ACTION.SETTING_PERIOD]: async ({ id }) => {
    bot.sendMessage(id, 'Select sending period', periodSettingsKeyboard());
  },
  [ACTION.NEXT_WORD]: async ({ value }) => {
    sendWord(Number(value));
  },
  [ACTION.SETTINGS_OPEN]: async ({ id }) => {
    showSettings(id);
  },
  [ACTION.SET_MODE]: async ({ id, value }) => {
    await services.updateUser({ telegramId: id, mode: value });
    bot.sendMessage(id, `I changed your mode to ${value}`, simpleKeyboard());
  },
  [ACTION.PERIOD_SET]: async ({ id, value }) => {
    await services.updateUser({ telegramId: id, period: Number(value) });
    bot.sendMessage(id, `I changed your period to ${value} min`, simpleKeyboard());
  },
  [ACTION.SETTINGS_CLOSE]: async ({ id, value }) => {
    await services.updateUser({ telegramId: id, period: Number(value) });
    const user = await services.getUser(id);
    if (!user) throw new Error('ALARMA!!! There is no user with this id!!!');
    bot.sendMessage(id, `Mode = ${user.mode}, period = ${user.period}`, simpleKeyboard());
  },
  [ACTION.CLOSE]: async () => {},
};

export const onCallbackQuery: CallBackHandler = async (query) => {
  const messageId = query.message?.message_id;
  const data = query.data;
  const user = query.from;
  const { id, first_name, username } = user;

  await services.addUser(id, first_name, username);

  if (!messageId) throw new Error('There is no messageId!!!');
  if (!data) throw new Error('There is no data!!!');

  const { action, value } = unpackData(data);

  bot.deleteMessage(id, messageId.toString());

  await actonsMapping[action as ACTION]({ id, value });
};

export const onStart: CommandHandler = async (msg) => {
  const { id, first_name, username } = msg.chat;

  await services.addUser(id, first_name, username);
  bot.sendMessage(id, `Hello "${msg.chat.username}"`, simpleKeyboard());
};

export const onTest: CommandHandler = async (msg) => {
  const { id } = msg.chat;
  await sendWord(id);
};

export const onMessage: MessageHandler = async (msg) => {
  const text = msg.text;

  if (!text) throw new Error("I'm a little confused");

  const isWordSkippable = commandsList.reduce((acc, item) => acc || item.command === text, false);

  if (isWordSkippable) return;

  bot.sendMessage(msg.chat.id, `Add word "${text}" to your list`, addWordDialogKeyboard(text));
};

export const onSettings: CommandHandler = async (msg) => {
  const { id } = msg.chat;
  showSettings(id);
};
