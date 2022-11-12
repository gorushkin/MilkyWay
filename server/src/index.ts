import { config } from './config';
import { app } from './app';

const { PORT_SERVER, HOST } = config;

const init = async () => {
  app(Number(PORT_SERVER), HOST);
};

init();
