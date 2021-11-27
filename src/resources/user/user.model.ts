import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils/db';

export const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
);
