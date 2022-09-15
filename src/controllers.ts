import { ActionMap, BotError, CallBackHandler, CommandHandler, MessageHandler } from './types';
import {
  unpackData,
  getFormattedSettingsMessage,
  getHiddenMessage,
  getMessageData,
  getValueFromMessageBody,
  getMessage,
} from './helpers';
import * as services from './services';
import { ACTION, commandsList, MODE } from './constants';
import bot from './index';
import {
  startKeyboard,
  settingsKeyboard,
  addWordDialogKeyboard,
  sendWordKeyBoard,
} from './helpers/keyboards';

export const sendEntireWord = async (telegramId: number) => {
  const { word, mode } = await services.getUserWords(telegramId);

  if (!word || !mode) throw new BotError('Sorry, you have no words at all');

  const message = getMessage(word.word);

  await bot.sendMessage(telegramId, message, {
    parse_mode: 'HTML',
    reply_markup: sendWordKeyBoard(mode),
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

const mapping: ActionMap = {
  [ACTION.DEFAULT]: async ({ button, value, hiddenValue, screen, user }) => {
    return getMessageData(button, value ? value : hiddenValue, screen, user);
  },
  [ACTION.ADD_WORD]: async ({ button, value, hiddenValue, screen, user }) => {
    return getMessageData(button, value ? value : hiddenValue, screen, user);
  },
  [ACTION.SET_LANGUAGE]: async ({ telegramId, value, button, hiddenValue, screen }) => {
    const updatedUser = await services.updateUser({ telegramId, language: value });
    return getMessageData(button, value ? value : hiddenValue, screen, updatedUser);
  },
  [ACTION.SET_MODE]: async ({ telegramId, value, button, hiddenValue, screen }) => {
    const updatedUser = await services.updateUser({ telegramId, mode: value });
    return getMessageData(button, value ? value : hiddenValue, screen, updatedUser);
  },
  [ACTION.SET_PERIOD]: async ({ telegramId, value, button, hiddenValue, screen }) => {
    const updatedUser = await services.updateUser({ telegramId, period: Number(value) });
    return getMessageData(button, value ? value : hiddenValue, screen, updatedUser);
  },
  [ACTION.ADD_WORD_CONFIRM]: async ({ telegramId, button, hiddenValue, screen, user }) => {
    const word = await services.addWord(hiddenValue, telegramId);

    const message = getMessage(word, `I added word "${word.text}" to your list\n`);

    return getMessageData(button, message, screen, user);
  },
  [ACTION.ADD_WORD_REFUSE]: async ({ value, button, hiddenValue, screen, user }) => {
    return getMessageData(button, value ? value : hiddenValue, screen, user);
  },
  [ACTION.WORD_SHOW]: async ({ telegramId, button, screen, user }) => {
    const { word, mode } = await services.getUserWords(telegramId);
    if (!word || !mode) throw new BotError('Sorry, you have no words at all');

    const message = getMessage(word.word);

    return getMessageData(button, message, screen, user);
  },
  [ACTION.CHANGE_MODE]: async ({ telegramId, button, screen, user, value, hiddenValue }) => {
    const mode = user.mode === MODE.START ? MODE.STOP : MODE.START;
    const updatedUser = await services.updateUser({ telegramId, mode });
    const word = await services.getWord(hiddenValue);

    if (!word) throw new BotError('There is no word!!!');

    const message = getMessage(word);

    return getMessageData(button, message, screen, updatedUser);
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

  if (!messageId) throw new Error('There is no messageId!!!');
  if (!data) throw new Error('There is no data!!!');
  if (!user) throw new Error('There is no user!!!');

  const { button, value, screen, action } = unpackData(data);

  const hiddenValue = query.message?.entities
    ? getValueFromMessageBody(query?.message?.entities[0])
    : '';

  const messageData = await mapping[action as ACTION]({
    value,
    telegramId: id,
    hiddenValue,
    button,
    screen,
    user,
  });

  try {
    await bot.editMessageText(messageData.message, {
      ...messageData.options,
      message_id: messageId,
      chat_id: chatId,
    });
  } catch (error) {
    console.log('error in onCallbackQuery');
    // TODO: do resend only if error appears because of the same word
    onCallbackQuery(query);
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

export const onTest: CommandHandler = (msg) => sendEntireWord(msg.chat.id);

export const onSettings: CommandHandler = (msg) => showSettings(msg.chat.id);
