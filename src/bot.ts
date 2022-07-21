import TelegramBot from 'node-telegram-bot-api';
import { Action, commandsList } from './constants';
import { getErrorMessage } from './errorHanlder';
import { getActionValue, getCallbackData } from './helpers';
import { services } from './services';

export const botService = async (TOKEN: string) => {
  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.setMyCommands(commandsList);

  bot.on('callback_query', async (query) => {
    const messageId = query.message?.message_id;
    const chatId = query.message?.chat.id;
    const data = query.data;

    if (!messageId) throw new Error('There is no messageId!!!');
    if (!chatId) throw new Error('There is no chatId!!!');
    if (!data) throw new Error('There is no data!!!');

    try {
      bot.deleteMessage(chatId, messageId.toString());
    } catch (error) {
      const message = getErrorMessage(error);
      console.log('message: ', message);
    }

    const { action, value } = getActionValue(data);

    if (action === Action.ADD_WORD_CONFIRM) {
      try {
        await services.addWord(value, chatId);
        bot.sendMessage(chatId, `I added word "${value}" to your list`);
      } catch (error) {
        const message = getErrorMessage(error);
        console.log('message: ', message);
      }
    }

    if (action === Action.ADD_WORD_REFUSE) {
      bot.sendMessage(chatId, `Ok!`);
    }
  });

  bot.onText(/\/start/, async (msg) => {
    const { id, first_name, username } = msg.chat;

    try {
      await services.addUser(id, first_name, username);
      bot.sendMessage(msg.chat.id, `Hello "${msg.chat.username}" `);
    } catch (error) {
      const message = getErrorMessage(error);
      console.log('message: ', message);
    }
  });

  bot.on('message', async (msg) => {
    const text = msg.text;

    if (!text) return bot.sendMessage(msg.chat.id, "I'm a little confused ");

    const isWordSkippable = commandsList.reduce((acc, item) => acc || item.command === text, false);

    if (isWordSkippable) return;

    bot.sendMessage(msg.chat.id, `Add word "${text}" to your list`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Add', callback_data: getCallbackData(Action.ADD_WORD_CONFIRM, text) },
            { text: 'Cancel', callback_data: getCallbackData(Action.ADD_WORD_REFUSE, text) },
          ],
        ],
      },
    });
  });
};
