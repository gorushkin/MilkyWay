import TelegramBot from 'node-telegram-bot-api';

export const botService = (TOKEN: string): TelegramBot => {
  let bot: TelegramBot | null = null;

  if (bot) return bot;

  bot = new TelegramBot(TOKEN, { polling: true });

  return bot;
};
