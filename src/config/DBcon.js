const logger = require('../services/logger');
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
   'chatbot',
   'root',
   'Ka6th1kkdm10@#', {

      dialect: 'mysql',                         
      host: 'localhost'
   }
);
sequelize.authenticate().then(() => {
    //console.log(' sequelize Connection has been established successfully.');
   logger.info({message:"sequelize Connection has been established successfully"})

 }).catch((error) => {
    //console.error('Unable to connect to the database: ', error);
    logger.error({message:`Unable to connect to the database: '${error} `})
 });


module.exports = sequelize   