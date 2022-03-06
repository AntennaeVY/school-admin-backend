const { DataTypes, Model, UUIDV4 } = require("sequelize");
const sequelize = require("../database/database");
const { encryptPassword } = require("../utils/encrypt");

class User extends Model {
  toJSON() {
    const userObject = this;
    delete userObject.password;
    return userObject;
  }
}

User.init(
  {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },

    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
      set(value) {
        this.setDataValue("date_of_birth", new Date(value));
      },
    },

    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\+[0-9]{1,3}\s[0-9]{4,15}$/,
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", encryptPassword(value));
      },
    },

    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
      defaultValue:
        "https://media.istockphoto.com/photos/gorgeous-ginger-cat-on-isolated-black-background-picture-id1018078858?k=20&m=1018078858&s=612x612&w=0&h=N8HorY5Ipk-RibWqx3zPERGpdB0ZT8mIhCvkDPRql6A=",
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "USER_ROLE",
      validate: {
        isIn: ["USER_ROLE", "ADMIN_ROLE", "TEACHER_ROLE"],
      },
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "Users" }
);

module.exports = User;
