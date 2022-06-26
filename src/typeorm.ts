import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from './db/entity/User';
import { AppDataSource } from './db/data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('bd is ready');
  })
  .catch((e) => {
    console.log(e);
  });

const user = new User();
