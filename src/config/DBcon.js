const logger = require('../services/logger');
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
   'chatbot',
   'root',
   'Ka6th1kkdm10@#', {

      dialect: 'mysql',                         
      host: 'localhost',
      logging: false
   }
);
sequelize.authenticate().then(() => {
   logger.info({message:"sequelize Connection has been established successfully"})
 }).catch((error) => {
    logger.error({message:`Unable to connect to the database: '${error} `})
 });


module.exports = sequelize   