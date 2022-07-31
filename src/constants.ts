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
  SET_MODE = 'SET_MODE',
  SET_PERIOD = 'SET_PERIOD',
}

export enum MODE {
  START = 'START',
  STOP = 'STOP',
}

export enum PERIOD {
  '15_MIN' = '15',
  '30_MIN' = '30',
}

export const commandsList = [
  { command: COMMAND.start, description: "Let's go" },
  { command: COMMAND.info, description: 'Some info about bot' },
  { command: COMMAND.settings, description: 'There are some settings' },
  { command: COMMAND.test, description: 'Send test word' },
];
