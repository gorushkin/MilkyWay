import * as dotenv from 'dotenv';

dotenv.config();

const { TOKEN, YANDEX_API_KEY, OXFORD } = process.env;

export const config = { TOKEN, YANDEX_API_KEY, OXFORD };
