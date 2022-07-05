import { sequelize, User } from './db3';

export const startSequelize = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await User.create({ telegramId: 15, username: 'fff' });
    const users = await User.findAll();
    console.log('seq users: ', users);

    users.forEach((user) => {
      console.log(user);
    });
  } catch (error) {
    console.log('error: ', error);
  }
};
