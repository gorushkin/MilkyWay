import { FastifyInstance } from 'fastify';
import { PrismaClient } from '../../../prisma/client';

const prisma = new PrismaClient();

export default async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    console.log('reply: ', reply);
    console.log('request: ', request);
    const users = await prisma.user.findMany();
    return { users };
  });
};
