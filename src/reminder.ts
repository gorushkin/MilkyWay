import TelegramBot from 'node-telegram-bot-api';
import { services } from './services';

const TIME_OUT = 5000;

const sender = async () => {
  console.log('send');
  const users = await services.getUsers();
  console.log('users: ', users);
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
