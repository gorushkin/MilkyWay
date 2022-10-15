import * as services from './services';
import { sendEntireWord } from './controllers';
import { errorHandler, getErrorMessage } from './errorHanlder';
import { MODE } from './constants';

const TIME_OUT = 5000;

const sender = async () => {
  const users = await services.getJobs();

  await Promise.all(
    users.map(async (user) => {
      errorHandler(sendEntireWord(user.telegramId), user.telegramId.toString());
      await services.updateUser({
        telegramId: user.telegramId,
        lastSendTime: true,
        mode: MODE.STOP,
      });
    })
  );
};

const scheduler = async () => {
  const timer = async () => {
    setTimeout(async () => {
      try {
        await sender();
      } catch (error) {
        const message = getErrorMessage(error);
        // TODO: add sentry
        // throw new DBError(message);
      }
      await timer();
    }, TIME_OUT);
  };

  await timer();
};

export { scheduler };
