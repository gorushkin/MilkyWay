import TelegramBot, { InlineKeyboardButton, Message } from 'node-telegram-bot-api';

enum buttons {
  addword = 'Add Word',
  showwords = 'show words',
  cancel = 'Cancel',
}

const keyboards: Record<string, InlineKeyboardButton[][]> = {
  start: [
    [
      { text: buttons.addword, callback_data: 'addword' },
      { text: buttons.showwords, callback_data: 'showwords' },
    ],
  ],
  addword: [[{ text: buttons.cancel, callback_data: 'cancel' }]],
};

// type TelegramService = (msg: Message, bot: TelegramBot) => void;
// type TelegramMiddleWare = (msg: Message) => void;

// const addMiddleWare =
//   (callback: TelegramService, msg: Message, bot: TelegramBot) =>
//   (middleWare: TelegramMiddleWare[] = []) => {
//     if (middleWare.length) {
//       console.log('we are going to do smth there');
//     }
//     callback(msg, bot);
//   };

const onStart = (msg: Message, bot: TelegramBot) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Let's go", {
    reply_markup: { inline_keyboard: keyboards.start },
  });
};

const onAddWord = (msg: Message, bot: TelegramBot) => {
  bot.sendMessage(msg.chat.id, 'Input your word', {
    reply_markup: { inline_keyboard: keyboards.addword },
  });
};

// const onCancel = (msg: Message, bot: TelegramBot) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, "Let's go", {
//     reply_markup: { inline_keyboard: keyboards.start },
//   });
// };

export { onStart, onAddWord };
