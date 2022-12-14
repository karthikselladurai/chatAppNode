const user = require('../../model/model')
const logger = require('../../services/logger');
const moment = require('moment')

exports.chatList = async ()=>{
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: ` get chat list  process start` })
    try{
        let resp = await user.findAll({where: {isAdmin 
        }})

    }
    catch(err){
        console.log(err);
    }
}