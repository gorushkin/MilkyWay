import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
} from '@prisma/client/runtime';
import { ERRORS } from './constants';
import { BotError } from './types';
import bot from './index';

export const getErrorMessage = (error: unknown): string => {
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
    if (id) bot.sendMessage(id, message);
  }
};
