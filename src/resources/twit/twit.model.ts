import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils/db';
import { User } from '../user/user.model';

export const Twit = sequelize.define('Twit', {
  // Model attributes are defined here
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  likes: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
  comments: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
  rootTwit: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  createdBy: {
    type: DataTypes.UUID,
    references: { model: User, key: 'id' },
    allowNull: false,
  },
});
