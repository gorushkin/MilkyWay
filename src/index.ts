import { botService } from './bot';
console.clear();
import { config } from './config';
import { addRoutes } from './routes';

if (!config.TOKEN) throw new Error('You should set bot token!');

const bot = botService(config.TOKEN);
addRoutes(bot);

export default bot;
