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

export enum BUTTON {
  SETTINGS = 'SETTINGS',
  SETTINGS_MODE = 'SETTINGS_MODE',
  SETTING_PERIOD = 'SETTING_PERIOD',
  SETTING_LANGUAGE = 'SETTING_LANGUAGE',
  SET_MODE = 'SET_MODE',
  SET_PERIOD = 'PERIOD_SET',
  SET_LANGUAGE = 'SET_LANGUAGE',
  ADD_WORD = "ADD_WORD"
}

export enum SCREEN {
  START = 'START',
  SETTINGS = 'SETTINGS',
  APPLY_SETTINGS = 'APPLY_SETTINGS',
  ADD_WORD = "ADD_WORD"
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
