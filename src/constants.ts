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
  ADD_WORD_CONFIRM = 'ADD_WORD_CONFIRM',
  ADD_WORD_REFUSE = 'ADD_WORD_REFUSE',
  NEXT_WORD = 'NEXT_WORD',
  SETTINGS_MODE = 'SETTINGS_MODE',
  SETTING_PERIOD = 'SETTING_PERIOD',
  SETTING_LANGUAGE = 'SETTING_LANGUAGE',
  SETTINGS_OPEN = 'SETTINGS_OPEN',
  SETTINGS_CLOSE = 'SETTINGS_CLOSE',
  SET_MODE = 'SET_MODE',
  PERIOD_SET = 'PERIOD_SET',
  CLOSE = 'CLOSE',
  READ_CONFIRM = 'READ_CONFIRM',
  LANGUAGE_SET = 'LANGUAGE_SET',
  WORD_ACTIONS = 'WORD_ACTIONS',
  REMOVE_WORD = 'REMOVE_WORD',
  CANCEL = 'CANCEL',
  SET_WORD_FREQ = 'SET_WORD_FREQ',
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
