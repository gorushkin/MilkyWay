import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
} from '../../prisma/client/runtime';
import { ERRORS } from './constants';
import { BotError } from './types';
import bot from './index';
import {} from 'node-telegram-bot-api';

export const getErrorMessage = (error: unknown): string => {
  let message = ERRORS.ERROR;
  if (error instanceof BotError) {
    message = error.message;
  }
  if (error instanceof PrismaClientKnownRequestError) {
    console.log('PrismaClientKnownRequestError');
    // console.log(error.meta);
    // console.log(error.code);
  }
  if (error instanceof PrismaClientInitializationError) {
    console.log('There is no connection to database');
    message = 'There is an error';
  }

  if (error instanceof PrismaClientValidationError) {
    console.log('PrismaClientValidationError');
    console.log(error.message);
  }

  if (error instanceof Error) {
    if (error.constructor.name === 'TelegramError') {
      console.log('TelegramError');
    }

    if (error.constructor.name === 'ParseError') {
      console.log('ParseError');
    }

    if (error.constructor.name === 'FatalError') {
      console.log('FatalError');
    }
  }

  return message;
};

export const errorHandler = async (
  func: unknown,
  id: string | undefined
): Promise<void | never> => {
  try {
    await func;
  } catch (error) {
    const message = getErrorMessage(error);
    if (id) await bot.sendMessage(id, message);
  }
};
