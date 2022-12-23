const express = require('express')
const   route = express.Router()
const ctrl = require('./controller')
const uploadFile = require('../middleware/upload')

console.log(">");

route.get('/products',ctrl.products);
route.post('/insert',ctrl.insertProduct);
route.post('/upload',uploadFile.single('laptopImg'))
route.post('/laptop',ctrl.insertLaptop)




module.exports = route ;