const Sequelize = require('sequelize');
const sequelize = require('../../config/DBcon');
const postModel = require('../../addPost/model')
const chatListModel = require('../../chat/model/chatList')

const user = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    email_id: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    mobile_number: {
        type: Sequelize.BIGINT(),
        allowNull: true
    },
    user_name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT(),
        allowNull: false,
    },
    is_admin: {
        type: Sequelize.BOOLEAN
    }

});
user.hasMany(postModel, { foreignKey: 'user_id' });
postModel.belongsTo(user, { foreignKey: 'user_id' });

user.belongsTo(chatListModel, { foreignKey: 'user_id' });
chatListModel.hasMany(user, { foreignKey: 'user_id' });



module.exports = user
    