import * as dotenv from 'dotenv';
import { botService } from './bot';
import DB from './db';

dotenv.config();

const { TOKEN } = process.env;

if (!TOKEN) throw new Error('You should set bot token!');

const db = DB.getInstance();

botService(TOKEN, db);
