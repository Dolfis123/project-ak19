const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Team = sequelize.define(
  "Team",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    facebook_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    twitter_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    instagram_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    linkedin_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "team",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Team;
