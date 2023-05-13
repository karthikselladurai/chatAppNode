const Sequelize = require('sequelize');
const sequelize = require('../config/DBcon')
const User = require('../user/model/model')
const postModel = sequelize.define('post', {

    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        primaryKey: true,
        allowNull: false        
    },
    user_id:{
        type: Sequelize.UUID,
        allowNull: false
    },
    image_url:{
        type:Sequelize.STRING(300),
        allowNull:false
    }

}
)


module.exports = postModel