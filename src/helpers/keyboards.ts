import { InlineKeyboardButton, InlineKeyboardMarkup } from 'node-telegram-bot-api';
import { ACTION, BUTTON, LANGUAGE, PERIOD, SCREEN } from '../constants';

export const packData = ({
  b,
  a = ACTION.DEFAULT,
  v = '',
  k = '',
  s = '',
}: {
  b: string;
  a?: ACTION;
  v?: string;
  k?: string;
  s?: string;
}) => JSON.stringify({ a, b, v, k, s });

const getInlineKeyboard = (buttons: InlineKeyboardButton[][]): InlineKeyboardMarkup => {
  return { inline_keyboard: buttons };
};

const getTextButton = (text: string, callback_data: string): InlineKeyboardButton => {
  return {
    text,
    callback_data,
  };
};

const buttons = {
  openSettings: (screen: string) =>
    getTextButton('Settings', packData({ b: BUTTON.SETTINGS, k: '', s: screen })),
  backToSettings: () => getTextButton('Back', packData({ b: BUTTON.SETTINGS, s: SCREEN.SETTINGS })),
  modeSettings: (screen: string) =>
    getTextButton('Mode', packData({ b: BUTTON.SETTINGS_MODE, s: screen })),
  periodSettings: (screen: string) =>
    getTextButton('Period', packData({ b: BUTTON.SETTING_PERIOD, s: screen })),
  languageSettings: (screen: string) =>
    getTextButton('Language', packData({ b: BUTTON.SETTING_LANGUAGE, s: screen })),
  modeStartSettings: (screen: string) =>
    getTextButton('Start', packData({ b: BUTTON.SET_MODE, s: screen, a: ACTION.SET_MODE })),
  modeStopSettings: (screen: string) =>
    getTextButton('Stop', packData({ b: BUTTON.SET_MODE, s: screen, a: ACTION.SET_MODE })),
  periodSetSettings1: (screen: string) =>
    getTextButton(
      '1 min',
      packData({ b: BUTTON.SET_PERIOD, v: PERIOD['1_MIN'], s: screen, a: ACTION.SET_PERIOD })
    ),
  periodSetSettings5: (screen: string) =>
    getTextButton(
      '5 min',
      packData({ b: BUTTON.SET_PERIOD, v: PERIOD['5_MIN'], s: screen, a: ACTION.SET_PERIOD })
    ),
  periodSetSettings15: (screen: string) =>
    getTextButton(
      '15 min',
      packData({ b: BUTTON.SET_PERIOD, v: PERIOD['15_MIN'], s: screen, a: ACTION.SET_PERIOD })
    ),
  periodSetSettings30: (screen: string) =>
    getTextButton(
      '30 min',
      packData({ b: BUTTON.SET_PERIOD, v: PERIOD['30_MIN'], s: screen, a: ACTION.SET_PERIOD })
    ),
  setEnLanguage: (screen: string) =>
    getTextButton(
      'En',
      packData({ b: BUTTON.SET_LANGUAGE, v: LANGUAGE.EN, s: screen, a: ACTION.SET_LANGUAGE })
    ),
  setDeLanguage: (screen: string) =>
    getTextButton(
      'De',
      packData({ b: BUTTON.SET_LANGUAGE, v: LANGUAGE.DE, s: screen, a: ACTION.SET_LANGUAGE })
    ),
  addWordConfirm: (screen: string) =>
    getTextButton('Add', packData({ b: BUTTON.ADD_WORD, v: 'confirm', s: screen })),
  addWordRefuse: (screen: string) =>
    getTextButton('Cancel', packData({ b: BUTTON.ADD_WORD, v: 'refuse', s: screen })),
};

export const startKeyboard = getInlineKeyboard([[buttons.openSettings(SCREEN.START)]]);

export const settingsKeyboard = getInlineKeyboard([
  [
    buttons.modeSettings(SCREEN.SETTINGS),
    buttons.periodSettings(SCREEN.SETTINGS),
    buttons.languageSettings(SCREEN.SETTINGS),
  ],
]);

export const modeSettingsKeyboard = getInlineKeyboard([
  [
    buttons.modeStartSettings(SCREEN.APPLY_SETTINGS),
    buttons.modeStopSettings(SCREEN.APPLY_SETTINGS),
    buttons.backToSettings(),
  ],
]);

export const periodSettingsKeyboard = getInlineKeyboard([
  [
    buttons.periodSetSettings1(SCREEN.APPLY_SETTINGS),
    buttons.periodSetSettings5(SCREEN.APPLY_SETTINGS),
    buttons.periodSetSettings15(SCREEN.APPLY_SETTINGS),
    buttons.periodSetSettings30(SCREEN.APPLY_SETTINGS),
  ],
  [buttons.backToSettings()],
]);

export const languageSettingsKeyboard = getInlineKeyboard([
  [
    buttons.setEnLanguage(SCREEN.APPLY_SETTINGS),
    buttons.setDeLanguage(SCREEN.APPLY_SETTINGS),
    buttons.backToSettings(),
  ],
]);

export const addWordDialogKeyboard = getInlineKeyboard([
  [buttons.addWordConfirm(SCREEN.ADD_WORD), buttons.addWordRefuse(SCREEN.ADD_WORD)],
]);

export const actionKeyboardMapping = {
  [BUTTON.SETTINGS]: settingsKeyboard,
  [BUTTON.SETTINGS_MODE]: modeSettingsKeyboard,
  [BUTTON.SETTING_PERIOD]: periodSettingsKeyboard,
  [BUTTON.SETTING_LANGUAGE]: languageSettingsKeyboard,
  [BUTTON.SET_MODE]: settingsKeyboard,
  [BUTTON.SET_PERIOD]: settingsKeyboard,
  [BUTTON.SET_LANGUAGE]: settingsKeyboard,
  [BUTTON.ADD_WORD]: addWordDialogKeyboard,
};
