"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Advertisement.init(
    {
      label: {
        type: DataTypes.STRING,
      },
      url: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Advertisement",
    }
  );

  return Advertisement;
};
//mongodb+srv://brinfotech:<password>@cluster0.rmfxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority