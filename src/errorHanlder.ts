import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
} from '@prisma/client/runtime';
import TelegramBot from 'node-telegram-bot-api';
import { ERRORS } from './constants';
import { Action, BotError, HandleError } from './types';

export const errorHandler = async (
  func: Action,
  onError: HandleError,
  bot: TelegramBot,
  id: number,
  value: string
): Promise<void | never> => {
  try {
    await func(bot, id, value);
  } catch (error) {
    let message = ERRORS.ERROR;
    if (error instanceof BotError) {
      console.log(error.message);
      message = error.message;
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
      message = error.message;
    }
    onError(bot, id, message);
  }
};
