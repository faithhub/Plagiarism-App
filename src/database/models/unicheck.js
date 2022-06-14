"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unicheck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Unicheck.init(
    {
      fileId: DataTypes.STRING,
      courseId: DataTypes.STRING,
      studentId: DataTypes.STRING,
      unicheckId: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["Pending", "Checked"],
      },
    },
    {
      sequelize,
      modelName: "Unicheck",
    }
  );
  return Unicheck;
};