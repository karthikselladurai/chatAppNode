const express = require('express')
const   route = express.Router()
const chatCtrl = require('../controler/controler')

console.log(">");

route.get('/chatList',chatCtrl.chatList);




module.exports = route ;