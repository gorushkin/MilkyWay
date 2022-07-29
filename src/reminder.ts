import TelegramBot from 'node-telegram-bot-api';
import { services } from './services';

const TIME_OUT = 5000;

const sender = async () => {
  console.log('send');
  const word = await services.getUsers();
};

const startReminder = () => {
  const timer = () => {
    setTimeout(() => {
      sender();
      timer();
    }, TIME_OUT);
  };

  timer();
};

export { startReminder };
