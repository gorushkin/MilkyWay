import TelegramBot, { CallbackQuery, Message } from 'node-telegram-bot-api';
import { User } from './db';
// import DB from './db';
import { commandsList, getButton, getActionValue, BUTTONS, ACTIONS } from './helpers';

// const db = DB.getInstance();

// db.addWord('task');

type TelegramService = (msg: Message, bot: TelegramBot) => void;

const onStart = async (msg: Message, bot: TelegramBot) => {
  console.log('msg: ', msg);
  const chatId = msg.chat.id;
  const user = await User.findOrCreate({
    where: {
      telegramId: msg.chat.id,
    },
    defaults: {
      telegramId: msg.chat.id,
      username: msg.chat.username,
    },
  });
  console.log('user: ', user);
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

const onInfo: TelegramService = async (msg, bot) => {
  // db.addWord('boom');

  bot.sendMessage(msg.chat.id, 'I added word');
};

const onTest: TelegramService = async (msg, bot) => {
  // const words = db.getWords();
  // const [word] = words;
  // if (!word) return bot.sendMessage(msg.chat.id, 'qwerty');
  // if (word.audio) {
  //   const response = await bot.sendAudio(msg.chat.id, word.audio, {
  //     caption: 'sdfgdfg',
  //     title: 'dd',
  //   });
  //   const file_id = response.audio?.file_id;
  //   console.log('file_id: ', file_id);
  //   return;
  // }
  // bot.sendMessage(msg.chat.id, ' word.audio', {
  //   parse_mode: 'Markdown',
  //   disable_web_page_preview: true,
  //   reply_markup: {
  //     inline_keyboard: [
  //       [
  //         { text: BUTTONS.CambridgeRu, url: word.cambridgeRu },
  //         { text: BUTTONS.CambridgeEn, url: word.cambridgeEn },
  //       ],
  //     ],
  //   },
  // });
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
    bot.sendMessage(query.message.chat.id, `I deleted word ${value}`);
  }

  if (type === ACTIONS.ADD_WORD_CONFIRM) {
    // db.addUser({ id, username, first_name });
    // const result = await db.addWord(value);
    // if (result?.error) {
    //   bot.sendMessage(query.message.chat.id, result.error);
    // }
    // if (result?.data) {
    //   bot.sendMessage(query.message.chat.id, `I added word ${value} to your list`);
    // }
  }
};

export { onStart, onMessage, onCallbackQuery, onTest, onInfo };
