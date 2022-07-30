import { CallBackHandler, CommandHandler, MessageHandler } from './types';
import { unpackData, packData, formateMessage } from './helpers';
import { services } from './services';
import { ACTION, commandsList, MODE, PERIOD } from './constants';
import bot from './index';
import { getLinks } from './api';

export const onCallbackQuery: CallBackHandler = async (query) => {
  const messageId = query.message?.message_id;
  const data = query.data;
  const user = query.from;
  const { id, first_name, username } = user;

  await services.addUser(id, first_name, username);

  if (!messageId) throw new Error('There is no messageId!!!');
  if (!data) throw new Error('There is no data!!!');

  const { action, value } = unpackData(data);

  const isMessageDestroyable =
    action === ACTION.ADD_WORD_CONFIRM ||
    action === ACTION.ADD_WORD_REFUSE ||
    action === ACTION.SET_MODE ||
    action === ACTION.SET_PERIOD;

  if (isMessageDestroyable) bot.deleteMessage(id, messageId.toString());

  if (action === ACTION.ADD_WORD_CONFIRM) {
    // TODO: validating - only letters
    await services.addWord(value, id);
    bot.sendMessage(id, `I added word "${value}" to your list`);
  }

  if (action === ACTION.ADD_WORD_REFUSE) {
    bot.sendMessage(id, `Ok!`);
  }

  if (action === ACTION.SET_MODE) {
    await services.updateUser(id, value);
    bot.sendMessage(id, `I will change your mode to ${value}`);
  }

  if (action === ACTION.SET_PERIOD) {
    await services.updateUser(id, undefined, Number(value));
    bot.sendMessage(id, `I will change your period to ${value}`);
  }
};

export const onStart: CommandHandler = async (msg) => {
  const { id, first_name, username } = msg.chat;

  await services.addUser(id, first_name, username);
  bot.sendMessage(id, `Hello "${msg.chat.username}" `);
};

export const onTest: CommandHandler = async (msg) => {
  const { id } = msg.chat;

  const word = await services.getUserWords(id);

  if (!word) return bot.sendMessage(id, 'You have no words!!!');

  const formattedMessage = formateMessage(word);

  const url = getLinks(word.text).CAMBRIDGE.RU;

  bot.sendMessage(id, formattedMessage, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [[{ text: 'open cambridge dictionary', url }]],
    },
  });
};

export const onMessage: MessageHandler = async (msg) => {
  const text = msg.text;

  if (!text) throw new Error("I'm a little confused");

  const isWordSkippable = commandsList.reduce((acc, item) => acc || item.command === text, false);

  if (isWordSkippable) return;

  bot.sendMessage(msg.chat.id, `Add word "${text}" to your list`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Add', callback_data: packData(ACTION.ADD_WORD_CONFIRM, text) },
          { text: 'Cancel', callback_data: packData(ACTION.ADD_WORD_REFUSE, text) },
        ],
      ],
    },
  });
};

export const onSettings: CommandHandler = async (msg) => {
  const { id } = msg.chat;

  bot.sendMessage(id, 'You can change...', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Start', callback_data: packData(ACTION.SET_MODE, MODE.START) },
          { text: 'Stop', callback_data: packData(ACTION.SET_MODE, MODE.STOP) },
        ],
        [
          { text: 'Period 15min', callback_data: packData(ACTION.SET_PERIOD, PERIOD['15_MIN']) },
          { text: 'Period 30min', callback_data: packData(ACTION.SET_PERIOD, PERIOD['30_MIN']) },
        ],
      ],
    },
  });
};
