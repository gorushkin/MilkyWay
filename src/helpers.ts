import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { ACTIONS, BUTTONS } from './types';

export const getButton = (text: BUTTONS, type: ACTIONS, value?: string) => {
  const callback_data = JSON.stringify({ type, ...(value && { value }) });
  return { text, callback_data };
};

export const commandsList = [
  { command: '/test', description: 'Command for test!!!' },
  { command: '/start', description: 'Start smth' },
];

export const getActionValue = (queryData: string) => {
  const data = JSON.parse(queryData);
  const { type, value } = data;
  return { type, value };
};

// const keyboards: Record<string, InlineKeyboardButton[][]> = {
//   start: [
//     [
//       { text: BUTTONS.ADD_WORD, callback_data: 'addword' },
//       { text: BUTTONS.SHOW_WORDS, callback_data: 'showwords' },
//     ],
//   ],
//   addWord: [
//     [
//       { text: BUTTONS.ADD, callback_data: 'add' },
//       { text: BUTTONS.CANCEL, callback_data: 'cancel' },
//     ],
//   ],
// };

export const getFlatArray = <T>(target: Array<T>): Array<T> => {
  const res: Array<T> = [];

  const req = (n: T | Array<T>) => {
    if (!Array.isArray(n)) res.push(n);
    else {
      n.forEach(req);
    }
  };

  req(target);
  return res;
};
