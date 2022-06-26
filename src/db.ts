import { Model, Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'dev.sqlite',
});

export class User extends Model {
  id: number;
  telegramId: number;
  first_name: string;
  username: string;
  lastSendTime: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    telegramId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastSendTime: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: 'Users' }
);
