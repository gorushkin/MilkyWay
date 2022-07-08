import TelegramBot, { CallbackQuery, Message } from 'node-telegram-bot-api';
import { commandsList, getButton, getActionValue, ACTIONS, BUTTONS } from './helpers';
import { repository } from './Models';
import { Action, CallbackQueryMap } from './types';

type TelegramService = (msg: Message, bot: TelegramBot) => void;

const onStart = async (msg: Message, bot: TelegramBot) => {
  const { id, first_name, username } = msg.chat;
  repository.User.addUser(id, first_name, username);
  bot.sendMessage(id, `Let's go, ${username}`);
};

const onMessage: TelegramService = (msg, bot) => {
  const {
    message_id,
    text,
    chat: { id, username, first_name },
  } = msg;

  if (!text) return;

  const skip = commandsList.reduce((acc, item) => acc || item.command === text, false);

  if (skip) return;

  bot.sendMessage(id, `Add "${text}" to your list?`, {
    reply_markup: {
      inline_keyboard: [
        [
          getButton(BUTTONS.ADD, ACTIONS.ADD_WORD_CONFIRM, text),
          getButton(BUTTONS.CANCEL, ACTIONS.ADD_WORD_REFUSE, text),
        ],
      ],
    },
  });
};

const onTest: TelegramService = async (msg, bot) => {
  const word = 'help';
  const res = await repository.Word.addWord(word);
};

const addWordAction: Action = async (bot, id, value) => {
  const res = await repository.Word.addWord(value);
  console.log('res: ', res);
  // bot.sendMessage(id, `I will add word ${value} in the future`);
};

const refuseWordAction: Action = (bot, id, value) => {
  bot.sendMessage(id, `I will delete word ${value} in the future`);
};

const callbackQueryMap: CallbackQueryMap = {
  ADD_WORD_REFUSE: refuseWordAction,
  ADD_WORD_CONFIRM: addWordAction,
};

const onCallbackQuery = async (query: CallbackQuery, bot: TelegramBot) => {
  const { data } = query;

  if (!data) {
    throw new Error('for somwe reasons there is no data');
  }

  if (!query.message?.chat.id) {
    throw new Error('for somwe reasons there is no message');
  }

  const { type, value } = getActionValue(data);

  const id = query.message?.chat.id;

  callbackQueryMap[type](bot, id, value);
};

export { onStart, onMessage, onCallbackQuery, onTest };
