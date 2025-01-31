import sequelize from '../config/DBconfig.js';
import { Model, DataTypes } from 'sequelize';

import User from '../models/User.js';

class Ticket extends Model {}

Ticket.init(
  {
    // Existing fields...
    case_number: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Subject cannot be empty',
        },
      },
    },

    record_type: {
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

    product_segment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product segment cannot be empty',
        },
      },
    },

    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Client ID is required',
        },
      },
    },

    // New assigned_to field
    assigned_to: {
      type: DataTypes.UUID,
      allowNull: true, // Can be null
      references: {
        model: 'users', // References the users table
        key: 'id',
      },
    },

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

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },

    closed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Ticket',
    tableName: 'tickets',
    timestamps: true,
    hooks: {
      beforeCreate: (ticket, options) => {
        // Your custom logic here
      },
    },
    indexes: [
      {
        unique: true,
        fields: ['case_number'],
      },
      {
        fields: ['client_id'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['record_type'],
      },
      {
        fields: ['assigned_to'],
      },
    ],
  }
);

// Add association with User model
Ticket.belongsTo(User, {
  foreignKey: 'assigned_to',
  as: 'assigned_user',
});

export default Ticket;
