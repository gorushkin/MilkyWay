import { CallBackHandler, CommandHandler, MessageHandler } from './types';
import { unpackData, packData, formateMessage } from './helpers';
import { services } from './services';
import { Action, commandsList } from './constants';
import bot from './index';
import { Message } from 'telegraf/typings/core/types/typegram';

export const onCallbackQuery: CallBackHandler = async (query) => {
  const messageId = query.message?.message_id;
  const chatId = query.message?.chat.id;
  const data = query.data;

  if (!messageId) throw new Error('There is no messageId!!!');
  if (!chatId) throw new Error('There is no chatId!!!');
  if (!data) throw new Error('There is no data!!!');

  bot.deleteMessage(chatId, messageId.toString());

  const { action, value } = unpackData(data);

  if (action === Action.ADD_WORD_CONFIRM) {
    // TODO: validating - only letters
    await services.addWord(value, chatId);
    bot.sendMessage(chatId, `I added word "${value}" to your list`);
  }

  if (action === Action.ADD_WORD_REFUSE) {
    bot.sendMessage(chatId, `Ok!`);
  }
};

export const onStart: CommandHandler = async (msg) => {
  const { id, first_name, username } = msg.chat;

  await services.addUser(id, first_name, username);
  bot.sendMessage(id, `Hello "${msg.chat.username}" `);
};

export const onTest: CommandHandler = async (msg) => {
  const { id, first_name, username } = msg.chat;

  const word = await services.getUserWords(id);

  if (!word) return bot.sendMessage(id, 'You have no words!!!');

  const formattedMessage = formateMessage(word);

  bot.sendMessage(id, formattedMessage, { parse_mode: 'HTML' });
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
          { text: 'Add', callback_data: packData(Action.ADD_WORD_CONFIRM, text) },
          { text: 'Cancel', callback_data: packData(Action.ADD_WORD_REFUSE, text) },
        ],
      ],
    },
  });
};
