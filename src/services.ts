import TelegramBot, { CallbackQuery, Message } from 'node-telegram-bot-api';
import { commandsList, getButton, getActionValue } from './helpers';
import userDB from './Models/User';
import wordDB from './Models/Word';
import { ACTIONS, BUTTONS } from './types';

type TelegramService = (msg: Message, bot: TelegramBot) => void;

const onStart = async (msg: Message, bot: TelegramBot) => {
  const { id, first_name, username } = msg.chat;
  userDB.addUser(id, first_name, username);
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
  const res = await wordDB.addWord(word);
  console.log('res: ', res);

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
    bot.sendMessage(query.message.chat.id, `I will delete word ${value} in the future`);
  }

  if (type === ACTIONS.ADD_WORD_CONFIRM) {
    bot.sendMessage(query.message.chat.id, `I will add word ${value} in the future`);

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

export { onStart, onMessage, onCallbackQuery, onTest };
