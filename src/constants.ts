export const ERRORS = {
  NOT_FOUND_TEXT: (text: string) => `No Definitions Found for\n"${text}"`,
  SERVER_ERROR: 'There is an error on the server. Try a bit later please',
  ERROR: 'Something is broken. Please say someone about it',
};

export enum Command {
  start = '/start',
  info = '/info',
  settings = '/settings',
}

export enum Action {
  ADD_WORD_CONFIRM = 'ADD_WORD_CONFIRM',
  ADD_WORD_REFUSE = 'ADD_WORD_REFUSE',
}

export const commandsList = [
  { command: Command.start, description: "Let's go" },
  { command: Command.info, description: 'Some info about bot' },
  { command: Command.settings, description: 'There are some settings' },
];
