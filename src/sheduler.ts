import { services } from './services';
import bot from './index';
import { formateMessage } from './helpers';
import { getLinks } from './api';
import { repository } from './Models';

const TIME_OUT = 5000;

const sender = async () => {
  const users = await services.getJobs();

  await Promise.all(
    users.map(async (user) => {
      const word = await services.getUserWords(user.telegramId);
      console.log('word: ', word);

      if (!word) return;

      const formattedMessage = formateMessage(word);

      const url = getLinks(word.text).CAMBRIDGE.RU;

      bot.sendMessage(user.telegramId, formattedMessage, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[{ text: 'open cambridge dictionary', url }]],
        },
      });
      await repository.User.updateUserSendTime(user.telegramId);
    })
  );
};

const sheduler = () => {
  const timer = () => {
    setTimeout(() => {
      sender();
      timer();
    }, TIME_OUT);
  };

  timer();
};

export { sheduler };
