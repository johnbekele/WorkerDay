import sequelize from '../config/DBconfig.js';
import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static associate(models) {
    User.hasMany(models.User, {
      as: 'employees',
      foreignKey: 'manager_id',
    });

    User.belongsTo(models.User, {
      as: 'manager',
      foreignKey: 'manager_id',
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    otherDetails: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Manager', 'Employee'),
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      validate: {
        isUUID: 4,
      },
    },
    refreshToken: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
