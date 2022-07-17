import TelegramBot, { Message } from 'node-telegram-bot-api';
import { commandsList, words } from './helpers';
import { repository } from './Models';
import { Action, BotRequestError, HandleError, TelegramService } from './types';

import { errorHandler } from './errorHanlder';

const addWordAction: Action = async (bot, id, value) => {
  const res = await repository.Word.addWord(value);
  const wordId = res?.id;
  if (wordId) await repository.User.addWord(id, wordId);

  bot.sendMessage(id, `I added word ${value} to your list`, {
    reply_markup: {
      keyboard: [[{ text: 'add word' }]],
    },
  });
};

const handleAddWordError: HandleError = async (bot, id, message) => {
  bot.sendMessage(id, message, {
    reply_markup: {
      keyboard: [[{ text: 'add word' }, { text: 'cancel' }]],
    },
  });
};

const withHandlerAddWordAction = (bot: TelegramBot, id: number, value: string) =>
  errorHandler(addWordAction, handleAddWordError, bot, id, value);

const onMessage: TelegramService = async (msg, bot) => {
  const {
    text,
    chat: { id },
  } = msg;

  console.log(text);

  const list = [...commandsList.map(({ command }) => command), ...words];

  const isWordSkipable = list.reduce((acc, item) => acc || item === text, false);

  if (isWordSkipable) return;

  if (!text) return;

  await withHandlerAddWordAction(bot, id, text);
};

const onStart = async (msg: Message, bot: TelegramBot) => {
  try {
    const { id, first_name, username } = msg.chat;
    await repository.User.addUser(id, first_name, username);

    bot.sendMessage(msg.chat.id, "Let's go", {
      reply_markup: {
        keyboard: [[{ text: 'add word' }]],
      },
    });
  } catch (error) {
    if (error instanceof BotRequestError) {
      console.log(error.message);
    }
  }
};

const onAddWord = async (msg: Message, bot: TelegramBot) => {
  bot.sendMessage(msg.chat.id, 'Enter you word, please', {
    reply_markup: { remove_keyboard: true },
  });
};

export { onStart, onMessage, onAddWord };
