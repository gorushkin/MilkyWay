import * as services from './services';
import { sendEntireWord } from './controllers';

const TIME_OUT = 5000;

const sender = async () => {
  const users = await services.getJobs();

  await Promise.all(
    users.map(async (user) => {
      await sendEntireWord(user.telegramId);
      await services.updateUser({
        telegramId: user.telegramId,
        lastSendTime: true,
      });
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
