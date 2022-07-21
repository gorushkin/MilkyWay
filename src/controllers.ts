import { CallBackHandler, CommandHandler, MessageHandler } from './types';
import { unpackData, packData } from './helpers';
import { services } from './services';
import { Action, commandsList } from './constants';

export const callBackAction: CallBackHandler = async (query, bot) => {
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

export const onStart: CommandHandler = async (msg, bot) => {
  const { id, first_name, username } = msg.chat;

  await services.addUser(id, first_name, username);
  bot.sendMessage(msg.chat.id, `Hello "${msg.chat.username}" `);
};

export const onMessage: MessageHandler = async (msg, bot) => {
  const text = '';
  console.log('case1');

  if (!text) throw new Error("I'm a little confused");

  console.log('case2');

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
