const express = require('express')
const   route = express.Router()
const chatCtrl = require('./handler')

console.log(">");

// route.get('/chatList',chatCtrl.getChatList);
route.post('/chatList/create',chatCtrl.create);




module.exports = route ;