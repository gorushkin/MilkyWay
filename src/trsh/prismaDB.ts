import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  console.log('prisma start');

  await prisma.user.create({
    data: {
      telegramId: 15,
      username: 'Ivan',
      first_name: 'asdfasdf',
      lastSendTime: new Date(),
    },
  });

  const psimaUsers = await prisma.user.findMany();
  console.log('qwe: ', psimaUsers);
};

export const startPrisma = async () => {
  try {
    await main();
  } finally {
    await prisma.$disconnect();
  }
};
