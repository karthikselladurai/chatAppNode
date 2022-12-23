const Sequelize = require('sequelize');
const sequelize = require('../../config/DBcon')
const products = sequelize.define('products', {
    productName: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    productCount: {
        type: Sequelize.INTEGER()
    }

});
productElectronic = sequelize.define('productElectronic',{
    productName:{
        type: Sequelize.STRING(30),
        allowNull: false
    }
});
productLaptop = sequelize.define('productLaptop',{
    laptopImg:{
        type:Sequelize.BLOB("long"),
        allowNull:false
    },
    laptopName:{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    laptopModel:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    laptopPrice :{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    laptopBrand:{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    color:{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    ram:{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    rom:{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    storageType:{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    displaytSize :{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    displayType :{
        type: Sequelize.STRING(30),
        allowNull: false
    }
})

  
module.exports = {
    products,
    productElectronic,
    productLaptop
}