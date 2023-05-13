const express = require('express');
const   route = express.Router();
const ctrl = require('./handler');
const { log } = require('winston');
// const { Deck } = require('card-deck');
// let myDeck ;




route.post('/signin', ctrl.signin)
route.post('/signup', ctrl.signup);

// route.get('/readAll/:id',ctrl.getAllUser)
// route.post('/auth', (req, res) => {
//     myDeck =  Deck();
//     console.log("yess");
//     console.log(">>>>>>>>>>>>> ", req.body.email);
//     deck.shuffle();
//    console.log("size ", deck.size());
//    console.log("random 2 ", deck.drawRandom(2));


//     res.send({ message: "success" })

// })






module.exports = route;