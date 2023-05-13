const express = require('express')
const   route = express.Router()
const ctrl = require('./controller')
const uploadFile = require('../middleware/upload')

console.log(">");

route.get('/products/:id',ctrl.getProductById)
route.get('/products',ctrl.products);
route.post('/insert',ctrl.insertProduct);
route.post('/upload',uploadFile.single('productImg'))
route.get('/getItems',ctrl.getItems)
// route.post('/electronicProduct',ctrl.electronicProduct)




module.exports = route ;