export const ERRORS = {
  NOT_FOUND_TEXT: (text: string) => `No Definitions Found for\n"${text}"`,
  SERVER_ERROR: 'There is an error on the server. Try a bit later please',
  ERROR: 'Something is broken. Please say someone about it',
};

export enum COMMAND {
  start = '/start',
  info = '/info',
  settings = '/settings',
  test = '/test',
}

export enum ACTION {
  SET_MODE = 'S_M',
  SET_LANGUAGE = 'S_L',
  SET_PERIOD = 'S_P',
  ADD_WORD = 'A_WD',
  DEFAULT = 'D',
}

export enum BUTTON {
  SETTINGS = 'SET',
  SETTINGS_MODE = 'MODE',
  SETTING_PERIOD = 'PERIOD',
  SETTING_LANGUAGE = 'LANG',
  SET_MODE = 'S_M',
  SET_PERIOD = 'S_P',
  SET_LANGUAGE = 'S_L',
  ADD_WORD = 'A_W',
}

export enum SCREEN {
  START = 'ST',
  SETTINGS = 'SET',
  APPLY_SETTINGS = 'A_S',
  ADD_WORD = 'A_W',
}

export enum MODE {
  START = 'START',
  STOP = 'STOP',
  WAITING = 'WAITING',
}

export enum PERIOD {
  '1_MIN' = '1',
  '5_MIN' = '5',
  '15_MIN' = '15',
  '30_MIN' = '30',
}

export enum LANGUAGE {
  DE = 'DE',
  EN = 'EN',
}

export const commandsList = [
  { command: COMMAND.start, description: "Let's go" },
  { command: COMMAND.info, description: 'Some info about bot' },
  { command: COMMAND.settings, description: 'There are some settings' },
  { command: COMMAND.test, description: 'Send test word' },
];
