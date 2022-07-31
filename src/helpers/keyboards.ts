import { InlineKeyboardButton, SendBasicOptions } from 'node-telegram-bot-api';
import { ACTION } from '../constants';
import { packData } from '.';

export const getInlineKeyboard = (buttons: InlineKeyboardButton[][]): SendBasicOptions => {
  return { reply_markup: { inline_keyboard: buttons } };
};

const getTextButton = (text: string, callback_data: string): InlineKeyboardButton => ({
  text,
  callback_data,
});

const getUrlButton = (text: string, url: string): InlineKeyboardButton => ({ text, url });

export const settingsButton = getTextButton('Settings', packData(ACTION.SETTINGS_OPEN, ''));

export const closeButton = getTextButton('Close', packData(ACTION.CLOSE, ''));

export const settingsBackButton = getTextButton('Back', packData(ACTION.SETTINGS_OPEN, ''));

export const nextWordButton = (telegramId: number) =>
  getTextButton('Next Word', packData(ACTION.NEXT_WORD, telegramId.toString()));

export const cambrigeUrlButton = (url: string) => getUrlButton('Cambridge dictionary', url);

export const sendWordKeyBoard = (url: string, telegramId: number) =>
  getInlineKeyboard([
    [cambrigeUrlButton(url), nextWordButton(telegramId)],
    [settingsButton, closeButton],
  ]);

export const settingsKeyboard = () =>
  getInlineKeyboard([
    [
      { text: 'Mode', callback_data: packData(ACTION.SETTINGS_MODE, '') },
      { text: 'Period', callback_data: packData(ACTION.SETTING_PERIOD, '') },
    ],
    [closeButton],
  ]);

export const modeSettingsKeyboard = () =>
  getInlineKeyboard([
    [
      { text: 'Start', callback_data: packData(ACTION.SET_MODE, 'START') },
      { text: 'Stop', callback_data: packData(ACTION.SET_MODE, 'STOP') },
    ],
    [settingsBackButton, closeButton],
  ]);

export const periodSettingsKeyboard = () =>
  getInlineKeyboard([
    [
      { text: '1 min', callback_data: packData(ACTION.PERIOD_SET, '1') },
      { text: '5 min', callback_data: packData(ACTION.PERIOD_SET, '5') },
      { text: '15 min', callback_data: packData(ACTION.PERIOD_SET, '15') },
      { text: '30 min', callback_data: packData(ACTION.PERIOD_SET, '30') },
    ],
    [settingsBackButton, closeButton],
  ]);

export const simpleKeyboard = () => getInlineKeyboard([[settingsButton, closeButton]]);

export const addWordDialogKeyboard = (text: string) =>
  getInlineKeyboard([
    [
      { text: 'Add', callback_data: packData(ACTION.ADD_WORD_CONFIRM, text) },
      { text: 'Cancel', callback_data: packData(ACTION.ADD_WORD_REFUSE, text) },
    ],
    [settingsButton, closeButton],
  ]);
