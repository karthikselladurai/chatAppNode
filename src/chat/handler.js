const chatCtrl = require('./controler')

exports.create = async(req,res)=>{
    const response = await chatCtrl.createChatList(req);
    return res.send(response)
}
exports.chatListGetByUserId = async(req,res)=>{
    const response = await chatCtrl.getChatList(req);
    console.log("response>>>>>>>>>>>>>>>>>>>> ",response);
    return res.send(response)
} 
 