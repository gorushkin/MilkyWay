import * as services from './services';
import { sendEntireWord } from './controllers';
import { errorHandler } from './errorHanlder';

const TIME_OUT = 5000;

const sender = async () => {
  const users = await services.getJobs();

  await Promise.all(
    users.map(async (user) => {
      errorHandler(sendEntireWord(user.telegramId), user.telegramId.toString());
      await services.updateUser({
        telegramId: user.telegramId,
        lastSendTime: true,
      });
    })
  );
};

const scheduler = async () => {
  const timer = async () => {
    setTimeout(async () => {
      await sender();
      await timer();
    }, TIME_OUT);
  };

  await timer();
};

export { scheduler };
