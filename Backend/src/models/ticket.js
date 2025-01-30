import sequelize from '../config/DBconfig.js';
import { Model, DataTypes } from 'sequelize';

import User from '../models/User.js';

class Ticket extends Model {}

Ticket.init(
  {
    // Case Number (ID)
    caseNumber: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    // Subject
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Subject cannot be empty',
        },
      },
    },

    // Record Type
    recordType: {
      type: DataTypes.ENUM(
        'Tech Support',
        'Request for Action',
        'Legal Content'
      ),
      allowNull: false,
      validate: {
        isIn: {
          args: [['Tech Support', 'Request for Action', 'Legal Content']],
          msg: 'Invalid record type',
        },
      },
    },

    // Product Segment
    productSegment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product segment cannot be empty',
        },
      },
    },

    // Client ID
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,

      validate: {
        notNull: {
          msg: 'Client ID is required',
        },
      },
    },

    // Additional useful fields
    status: {
      type: DataTypes.ENUM('Open', 'In Progress', 'Closed', 'On Hold'),
      defaultValue: 'Open',
      allowNull: false,
    },

    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
      defaultValue: 'Medium',
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },

    closedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Ticket',
    tableName: 'tickets',
    timestamps: true, // This will automatically manage createdAt and updatedAt
    hooks: {
      beforeCreate: (ticket, options) => {
        // You could add custom logic here, like generating a custom case number format
      },
    },
    indexes: [
      {
        unique: true,
        fields: ['caseNumber'],
      },
      {
        fields: ['clientId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['recordType'],
      },
    ],
  }
);

export default Ticket;
