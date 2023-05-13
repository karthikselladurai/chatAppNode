const express = require('express');
const route = express.Router();
const ctrl = require('./handler')

route.post('/addPost',ctrl.addPost);
route.post('/getPostByUserId',ctrl.getPostById);

route.get('/getAllPost',ctrl.getAllPost);



module.exports = route;