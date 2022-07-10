import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
} from '@prisma/client/runtime';
import TelegramBot from 'node-telegram-bot-api';
import { BotRequestError } from './api';
import { Action } from './types';

export const errorHandler = async (
  func: Action,
  bot: TelegramBot,
  id: number,
  value: string
): Promise<void | never> => {
  try {
    await func(bot, id, value);
  } catch (error) {
    // const err = 'There was an error. Sorry!';
    if (error instanceof BotRequestError) {
      console.log(error.message);
    }
    if (error instanceof PrismaClientKnownRequestError) {
      console.log('PrismaClientKnownRequestError');
      console.log(error.meta);
    }
    if (error instanceof PrismaClientInitializationError) {
      console.log('PrismaClientInitializationError');
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack);
    }
    // bot.sendMessage(id, `There was an error. Sorry!`);
  }
};
