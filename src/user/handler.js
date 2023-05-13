const userCtrl = require('./controller/controller')

exports.signin = async(req,res)=>{
    const response = await userCtrl.login(req);
    console.log("response>>>>>>>>>>>>>>>>>>>> ",response);
    return res.send(response)
} 
exports.signup = async(req,res)=>{
    const response = await userCtrl.registration(req);
    return res.send(response)
} 