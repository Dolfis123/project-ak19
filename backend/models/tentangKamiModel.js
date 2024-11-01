// models/tentangKamiModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TentangKami = sequelize.define(
  "TentangKami",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    gambaran_singkat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    visi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    misi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nilai_utama: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "tentangkami",
    timestamps: false, // Disable automatic timestamps
  }
);

module.exports = TentangKami;
