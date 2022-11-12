import * as dotenv from 'dotenv';

dotenv.config();

const { PORT_SERVER = 3000, DATABASE_URL, HOST = '0.0.0.0' } = process.env;

export const config = { PORT_SERVER, DATABASE_URL, HOST };
