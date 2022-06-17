import TelegramBot, { CallbackQuery, Message } from 'node-telegram-bot-api';
import DB from './db';
import { commandsList, getButton, getActionValue, BUTTONS, ACTIONS } from './helpers';

const db = DB.getInstance();

db.addWord('task');

type TelegramService = (msg: Message, bot: TelegramBot) => void;

const onStart = (msg: Message, bot: TelegramBot) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Let's go");
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

  bot.deleteMessage(id, message_id.toString());

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

const onCallbackQuery = async (query: CallbackQuery, bot: TelegramBot) => {
  if (!query.message?.chat.id) throw new Error('ALARM!!!!');

  const {
    message: {
      message_id,
      chat: { id, username, first_name },
    },
    data,
  } = query;

  if (!data) return;

  const { type, value } = getActionValue(data);

  if (type === ACTIONS.ADD_WORD_REFUSE) {
    bot.answerCallbackQuery(query.id, { text: `I deleted word ${value}` });
  }

  if (type === ACTIONS.ADD_WORD_CONFIRM) {
    db.addUser({ id, username, first_name });
    const result = await db.addWord(value);
    if (result?.error) {
      bot.answerCallbackQuery(query.id, { text: result.error });
    }
    if (result?.data) {
      bot.answerCallbackQuery(query.id, { text: `I added word ${value} to your list` });
    }
  }

  bot.deleteMessage(id, message_id.toString());
};

export { onStart, onMessage, onCallbackQuery };
