import { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.get('/auth', async (request, reply) => {
    console.log('reply: ', reply);
    console.log('request: ', request);
    return { hello: 'world' };
  });
};
