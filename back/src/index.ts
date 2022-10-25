import Fastify from 'fastify';
import { controllers } from './routes';
import { config } from './config';

if (!config.PORT) throw new Error('There is no port');

const port = Number(config.PORT);

const start = async (port: number) => {
  const app = Fastify({
    logger: true,
  });

  app.after(() => {
    controllers.forEach((controller) => {
      app.register(controller);
    });
  });

  try {
    await app.listen({ port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start(port);
