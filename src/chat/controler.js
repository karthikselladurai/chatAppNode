const chatListModel = require('./model/chatList')
const logger = require('../services/logger');
const moment = require('moment');
const { log } = require('winston');


exports.createChatList = async (req) => {
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: ` get chat list  process start` })
    try {
        if (req.body.user_id) {
            let insertData={
                user_id:req.body.user_id
            }
            let resp = await chatListModel.create(insertData);
            console.log(resp);
            // if(resp != null || resp != undefined){
            //     return({status:'Unsuccess',message:"Chat List created Failed",data:[]})
            // }
            return({status:'Success',message:"Chat List created Successfully",data:[]})
        }
        return({status:'Unsuccess',message:"User Id Is Must",data:[]})
    }
    catch (err) {
        console.log(err);
    }
}
exports.getChatList = async (req) => {
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: ` get chat list  process start` })
    try {
        let resp = await chatListModel.create();
    }
    catch (err) {
        console.log(err);
    }
}
exports.getChatList = async (req) => {
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: ` get chat list  process start` })
    try {
        let resp = await chatListModel.create();
    }
    catch (err) {
        console.log(err);
    }
}