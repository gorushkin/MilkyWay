import Fastify from 'fastify';
import { controllers } from './routes';

export const app = async (port: number, host: string) => {
  const fastify = Fastify({
    logger: true,
  });

  fastify.after(() => {
    controllers.forEach((controller) => {
      fastify.register(controller);
    });
  });

  try {
    await fastify.listen({ port, host });
    console.log(`Server is up on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
