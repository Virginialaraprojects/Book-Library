'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title:{ 
      type:DataTypes.STRING,
      allowNull: false,// does not accept null as an option 
      validate: {
        notNull:{
          msg:'"Title" is required'
        },
        notEmpty: {
          msg: '"Title" is required'
        }
      }
    },
    author:{ 
      type:DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull:{
          msg:'"Author" is required'
        },
        notEmpty: {
          msg: '"Author" is required'
        }
      }
    },
    genre:{ 
      type:DataTypes.STRING,
      allowNull: true,
    },
    year:{
     type:DataTypes.INTEGER,
     allowNull: true,
    },
  }, {
    modelName: 'Book',
    sequelize,
    
  });
  return Book;
};