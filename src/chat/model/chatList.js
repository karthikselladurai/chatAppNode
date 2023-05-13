const Sequelize = require('sequelize');
const sequelize = require('../../config/DBcon');
// const user = require('../../user/model/model')

const chatListModel = sequelize.define('chat_list', {
    chat_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false
    },  
    user_chat_list: {
        type: Sequelize.JSON,
        allowNull: true
    }

})


module.exports = chatListModel