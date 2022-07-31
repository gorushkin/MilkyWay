import { services } from './services';
import { repository } from './Models';
import { sendWord } from './controllers';

const TIME_OUT = 5000;

const sender = async () => {
  const users = await services.getJobs();

  await Promise.all(
    users.map(async (user) => {
      await sendWord(user.telegramId);
      await repository.User.updateUserSendTime(user.telegramId);
    })
  );
};

const sheduler = async () => {
  const timer = async () => {
    setTimeout(async () => {
      await sender();
      await timer();
    }, TIME_OUT);
  };

  await timer();
};

export { sheduler };
