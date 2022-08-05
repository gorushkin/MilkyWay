import { ActionMap, BotError, CallBackHandler, CommandHandler, MessageHandler } from './types';
import { unpackData, getFormattedMessage, getformattedMessageBody } from './helpers';
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
  closeKeyboard,
  startKeyboard,
  languageSettingsKeyboard,
} from './helpers/keyboards';

export const sendEntireWord = async (telegramId: number) => {
  const word = await services.getUserWords(telegramId);

  if (!word) return;

  const formattedMessage = getFormattedMessage(word);

  const url = getLinks(word.text).CAMBRIDGE.RU;

  await bot.sendMessage(telegramId, formattedMessage, {
    parse_mode: 'HTML',
    ...sendWordKeyBoard(url, telegramId),
  });
};

export const showSettings = (telegramId: number) =>
  bot.sendMessage(telegramId, 'Settings', settingsKeyboard());

const actonsMapping: ActionMap = {
  [ACTION.ADD_WORD_CONFIRM]: async ({ id, value }) => {
    // TODO: validating - only letters
    const word = await services.addWord(value, id);
    const formattedMessageBody = getformattedMessageBody(word);
    await bot.sendMessage(id, `I added word "${value}" to your list\n${formattedMessageBody}`, {
      parse_mode: 'HTML',
      ...closeKeyboard(),
    });
  },
  [ACTION.ADD_WORD_REFUSE]: async ({ id }) => {
    await bot.sendMessage(id, `Ok!`, closeKeyboard());
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
    sendEntireWord(Number(value));
  },
  [ACTION.SETTINGS_OPEN]: async ({ id }) => {
    showSettings(id);
  },
  [ACTION.SET_MODE]: async ({ id, value }) => {
    await services.updateUser({ telegramId: id, mode: value, lastSendTime: true });
    await bot.sendMessage(id, `I changed your mode to ${value}`, closeKeyboard());
  },
  [ACTION.PERIOD_SET]: async ({ id, value }) => {
    await services.updateUser({ telegramId: id, period: Number(value) });
    await bot.sendMessage(id, `I changed your period to ${value} min`, closeKeyboard());
  },
  [ACTION.SETTINGS_CLOSE]: async ({ id, value }) => {
    await services.updateUser({ telegramId: id, period: Number(value) });
    const user = await services.getUser(id);
    if (!user) throw new Error('ALARMA!!! There is no user with this id!!!');
    await bot.sendMessage(id, `Mode = ${user.mode}, period = ${user.period}`, simpleKeyboard());
  },
  [ACTION.CLOSE]: async () => {},
  [ACTION.READ_CONFIRM]: async ({ id }) => {
    await services.updateUser({ telegramId: id, mode: MODE.START, lastSendTime: true });
  },
  [ACTION.LANGUAGE_SET]: async ({ id, value }) => {
    await services.updateUser({ telegramId: id, language: value });
    await bot.sendMessage(id, `I changed your language to ${value} min`, closeKeyboard());
  },
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

  await bot.deleteMessage(id, messageId.toString());

  await actonsMapping[action as ACTION]({ id, value });
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
