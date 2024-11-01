  // models/heroModel.js

  const { DataTypes } = require("sequelize");
  const sequelize = require("../config/database");

  const Hero = sequelize.define(
    "Hero",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "hero",
      timestamps: false,
    }
  );

  module.exports = Hero;
