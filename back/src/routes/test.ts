
import { FastifyInstance} from 'fastify';

export default async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    console.log('reply: ', reply);
    console.log('request: ', request);
    return { hello: 'world' }
  })
}
