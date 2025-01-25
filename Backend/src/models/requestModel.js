import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DBconfig.js';
import User from '../models/User.js';

const Request = sequelize.define(
  'Request',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    requestType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    requester_role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    managerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    reason: {
      type: DataTypes.TEXT, // Optional field
      allowNull: true,
    },
    approved_by: {
      type: DataTypes.UUID, // The ID of the user who approves the request
      allowNull: true, // can be null until it's approved
      references: {
        model: User, // Reference the User model
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Request;
