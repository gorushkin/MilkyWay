import * as services from './services';
import { sentEntireWord } from './controllers';
import { MODE } from './constants';

const TIME_OUT = 5000;

const sender = async () => {
  const users = await services.getJobs();

  await Promise.all(
    users.map(async (user) => {
      await sentEntireWord(user.telegramId);
      await services.updateUser({
        telegramId: user.telegramId,
        lastSendTime: true,
        mode: MODE.WAITING,
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
