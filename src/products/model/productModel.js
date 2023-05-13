const Sequelize = require('sequelize');
const sequelize = require('../../config/DBcon')


const productList = sequelize.define('productlist',{
    productName:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    productId:{
        type: Sequelize.STRING(30),
        allowNull: false
    }
})
const   productItems = sequelize.define('productitems',{
    productImg:{
        type:Sequelize.BLOB("long"),
        allowNull:false
    },
    productName:{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    productType:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    productPrice :{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    productBrand:{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    pruductColor:{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    productSpecification:{
        type: Sequelize.JSON(),
        allowNull: false    
    },
    pruductImageUrl:{
        type:Sequelize.STRING(300),
        allowNull:true
    },
    productImageUrl:{
        type:Sequelize.JSON(),
        allowNull:true
    },
    imageUrl:{
        type:Sequelize.JSON(),
        allowNull:true
    }
    
    
})

module.exports = { 
    productList,
    productItems
}