import { botService } from './bot';
console.clear();
import { config } from './config';

if (!config.TOKEN) throw new Error('You should set bot token!');

botService(config.TOKEN);
