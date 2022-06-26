import * as dotenv from 'dotenv';
import { botService } from './bot';
import { sequelize, User } from './db';
dotenv.config();
console.clear();
import { PrismaClient } from '@prisma/client';

const { TOKEN } = process.env;
const prisma = new PrismaClient();
if (!TOKEN) throw new Error('You should set bot token!');

botService(TOKEN);

const main = async () => {
  console.log('asdfasdf');

  const user = await prisma.

  // const posts = await prisma.post.findMany();
  // console.log('posts: ', posts);

  // const post = await prisma.post.findFirst();
  // if (post) {
  //   console.log(post.authorId);
  // }
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// (async () => {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync({ force: true });
//   } catch (error) {
//     console.log('error: ', error);
//   }
// })();
