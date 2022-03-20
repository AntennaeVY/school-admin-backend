const { DataTypes, Model, UUIDV4 } = require("sequelize");
const sequelize = require("../database/database");
const { encryptPassword } = require("../utils/encrypt");

class User extends Model {
  toJSON() {
    const userObject = this;
    delete userObject.dataValues.password;
    return userObject.dataValues;
  }

  toToken() {
    const userObject = this.dataValues;

    const validKeys = ["_id", "email", "role"];

    Object.keys(userObject).forEach(
      (key) => validKeys.includes(key) || delete userObject[key]
    );

    return userObject;
  }
}

User.init(
  {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: {
          args: [4],
          msg: "Invalid ID format",
        },
      },
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
        is: {
          args: [/^\+[0-9]{1,3}\s[0-9]{4,15}$/],
          msg: "Invalid phone number format",
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: [true],
          msg: "Invalid email format",
        },
      },
      primaryKey: true,
    },

    // Password is nullable (Might change??)

    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue("password", encryptPassword(value));
      },
    },

    // Default Avatar value for testing, be aware of it..

    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          args: [true],
          msg: "Invalid url for avatar",
        },
      },
      defaultValue:
        "https://media.istockphoto.com/photos/gorgeous-ginger-cat-on-isolated-black-background-picture-id1018078858?k=20&m=1018078858&s=612x612&w=0&h=N8HorY5Ipk-RibWqx3zPERGpdB0ZT8mIhCvkDPRql6A=",
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "USER_ROLE",
      validate: {
        isIn: {
          args: [["USER_ROLE", "ADMIN_ROLE", "TEACHER_ROLE"]],
          msg: "Invalid role format",
        },
      },
    },

    isBachelor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "PENDING",
      validate: {
        isIn: {
          args: [["ACTIVE", "PENDING", "INACTIVE"]],
          msg: "Invalid state format",
        },
      },
    },
  },
  { sequelize, modelName: "Users" }
);

module.exports = User;
