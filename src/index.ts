import * as dotenv from 'dotenv';
import { botService } from './bot';
dotenv.config();
console.clear();

const { TOKEN } = process.env;
if (!TOKEN) throw new Error('You should set bot token!');

botService(TOKEN);
