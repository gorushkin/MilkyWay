import { InlineKeyboardButton, SendBasicOptions } from 'node-telegram-bot-api';
import { ACTION, LANGUAGE, MODE, PERIOD } from '../constants';
import { packData } from '.';

export const getInlineKeyboard = (buttons: InlineKeyboardButton[][]): SendBasicOptions => {
  return { reply_markup: { inline_keyboard: buttons } };
};

const getTextButton = (text: string, callback_data: string): InlineKeyboardButton => ({
  text,
  callback_data,
});

// const getUrlButton = (text: string, url: string): InlineKeyboardButton => ({ text, url });
// const cancelButton = getTextButton('Cancel', packData(ACTION.CANCEL, ''));
// const getCambridgeUrlButton = (url: string) => getUrlButton('Cambridge dictionary', url);

const settingsButton = getTextButton('Settings', packData(ACTION.SETTINGS_OPEN, ''));
const languageButtonEN = getTextButton(LANGUAGE.EN, packData(ACTION.LANGUAGE_SET, LANGUAGE.EN));
const languageButtonDE = getTextButton(LANGUAGE.DE, packData(ACTION.LANGUAGE_SET, LANGUAGE.DE));

const wordActionButton = getTextButton('Actions', packData(ACTION.WORD_ACTIONS, ''));

const wordRemoveButton = getTextButton(
  'Remove word from your list',
  packData(ACTION.REMOVE_WORD, '')
);

const settingsBackButton = getTextButton('Back', packData(ACTION.SETTINGS_OPEN, ''));

const nextWordButton = getTextButton('Next Word', packData(ACTION.NEXT_WORD, ''));

const getModeButton = (mode: string) => {
  const modeMap = {
    [MODE.START as string]: {
      value: MODE.STOP,
      text: 'Pause',
    },
    [MODE.STOP as string]: {
      value: MODE.START,
      text: 'Continue',
    },
  };

  return {
    text: modeMap[mode].text,
    callback_data: packData(ACTION.SET_MODE, modeMap[mode].value),
  };
};

export const wordSettingsKeyboard = () => getInlineKeyboard([[wordRemoveButton]]);

const getFrequencyButton = (index: string) =>
  getTextButton(index, packData(ACTION.SET_WORD_FREQ, index));

const frequencyButtons = new Array(5)
  .fill(0)
  .map((_, index) => getFrequencyButton((index + 1).toString()));

export const sendWordKeyBoard = (telegramId: number, mode: string) => {
  return getInlineKeyboard([[wordActionButton, nextWordButton, getModeButton(mode)]]);
};

export const settingsKeyboard = () => {
  return getInlineKeyboard([
    [
      { text: 'Mode', callback_data: packData(ACTION.SETTINGS_MODE, '') },
      { text: 'Period', callback_data: packData(ACTION.SETTING_PERIOD, '') },
      { text: 'Language', callback_data: packData(ACTION.SETTING_LANGUAGE, '') },
    ],
  ]);
};

export const modeSettingsKeyboard = () =>
  getInlineKeyboard([
    [
      { text: 'Start', callback_data: packData(ACTION.SET_MODE, MODE.START) },
      { text: 'Stop', callback_data: packData(ACTION.SET_MODE, MODE.STOP) },
    ],
    [settingsBackButton],
  ]);

export const periodSettingsKeyboard = () =>
  getInlineKeyboard([
    [
      { text: '1 min', callback_data: packData(ACTION.PERIOD_SET, PERIOD['1_MIN']) },
      { text: '5 min', callback_data: packData(ACTION.PERIOD_SET, PERIOD['5_MIN']) },
      { text: '15 min', callback_data: packData(ACTION.PERIOD_SET, PERIOD['15_MIN']) },
      { text: '30 min', callback_data: packData(ACTION.PERIOD_SET, PERIOD['30_MIN']) },
    ],
    [settingsBackButton],
  ]);

export const languageSettingsKeyboard = () =>
  getInlineKeyboard([[languageButtonEN, languageButtonDE], [settingsBackButton]]);

export const changeModeKeyboard = (mode: string) => getInlineKeyboard([[getModeButton(mode)]]);

export const simpleKeyboard = () => getInlineKeyboard([[settingsButton]]);

export const startKeyboard = () => getInlineKeyboard([[languageButtonEN, languageButtonDE]]);

export const addWordDialogKeyboard = (text: string) =>
  getInlineKeyboard([
    [
      { text: 'Add', callback_data: packData(ACTION.ADD_WORD_CONFIRM, text) },
      { text: 'Cancel', callback_data: packData(ACTION.ADD_WORD_REFUSE, text) },
    ],
  ]);
