const Sequelize = require('sequelize');
const sequelize = require('../config/DBcon')

const user = sequelize.define('user', {

    userFirstName: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    userLastName: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    userEmail: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    mobileNumber: {
        type: Sequelize.BIGINT(),
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    userPassword: {
        type: Sequelize.TEXT(),
        allowNull: false,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    }


});

module.exports = user
    