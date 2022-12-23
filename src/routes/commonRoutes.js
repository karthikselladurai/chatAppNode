const express = require('express');
const route = express.Router();
const ctrl = require('../controller/controler')




route.post('/login',ctrl.login)
route.post('/registration',ctrl.registration);
route.get('/readAll/:id',ctrl.getAllUser)





module.exports = route;