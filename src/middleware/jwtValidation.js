const jwt = require('jsonwebtoken');
const moment = require('moment');
const logger = require('../logger/logger')

//check token
exports.checkToken = function (req, res, next) {
let startTime = moment().format('HH:mm:ss')
logger.info({time:`${startTime}` ,message:` Check Token process start ...`})
var token = req.get('Authorization');
// console.log(">>>>>> token",token)
if (token) {
    token = token.slice(7);
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        //res.json({massage:"access granded"})
        if (err) {
            console.log(err)
            return res.status(400).json({ massage: "invalid token" })
            
        } else {
            next()
        }
    });
} else {
   return res.status(400).json({ massage: "access denide" })

}
}