const moment = require('moment');
const user = require('../model/model');
const logger = require('../services/logger');
const jwt = require('jsonwebtoken')
const env = process.env
const { loginSchema, registerSchema } = require('../middleware/joiValidation');
const bcrypt = require('bcrypt');
const sequelize = require('../config/DBcon');
const Sequelize = require('sequelize');


exports.login = async function (req, res) {
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: ` login process start` })
    try {
        const resp = await user.findOne({
            where:
                { userName: req.body.userName },
            attributes: ['id', 'userFirstName', 'userLastName', 'userName', 'userEmail', 'mobileNumber', 'userPassword', 'isAdmin']
        })
        if (resp) {
            const passwordValid = await bcrypt.compare(req.body.userPassword, resp.dataValues.userPassword);
            if (passwordValid) {
                const resp = await user.findOne({
                    where:
                        { userName: req.body.userName },
                    attributes: ['id', 'userFirstName', 'userLastName', 'userName', 'userEmail', 'mobileNumber', 'isAdmin']
                })
                token = jwt.sign({ id: resp.dataValues.id }, env.SECRET, { expiresIn: "24h" });
                res.status(200).send({ status: "success", data: resp, token: token });
            } else {
                res.status(400).send({ status: "unsuccess", message: "invalid password", data: {} })
            }
        } else {
            res.status(400).send({ status: "unsuccess", message: "invalid user", data: {} })
        }
    }
    catch (err) {
        console.log(err);
        logger.error({ status: "unseccess", error: err })
    }
    let endTime = moment().format('HH:mm:ss')
    logger.info({ time: `${endTime}`, message: ` login process end` })
}
exports.registration = async (req, res) => {
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: ` regiter process start` })
    req = req.body
    console.log(env.SALT);
    let insertData = {
        userFirstName: req.userFirstName,
        userLastName: req.userLastName,
        userEmail: req.userEmail,
        mobileNumber: req.mobileNumber,
        userName: req.userName,
        userPassword: await bcrypt.hash(req.userPassword, parseInt(env.SALT)),
        isAdmin: req.isAdmin
    }
    let validateResult = await registerSchema.validate(insertData);
    console.log(insertData.userPassword);
    if (validateResult.error) {
        res.status(400).json({ status: "success", msg: validateResult.error.details[0].message, data: {} })
    } else {
        await user.findOne({ where: { userName: req.userName } })
            .then(async result => {
                if (result == null || result.lenght == 0) {
                    await user.create(insertData
                    ).then(result => {
                        res.status(200).json({ status: "sucess", msg: "register sucessfully", data: {} })

                    }).catch(err => {
                        console.log(err)
                        res.status(400).json({ status: "success", error: err, data: {} })
                    })
                } else {
                    return res.status(400).send({ status: "success", msg: "user name already exits ", data: {} })
                }
            }).catch(err => { console.log(err) });

    }
    let endTime = moment().format('HH:mm:ss')
    logger.info({ time: `${endTime}`, message: ` regiter process end` })

}
exports.getAllUser = async(req,res)=>{
    try{
        resp = await user.findAll(/*{where:{id:{[Sequelize.Op.not]:req.params['id']}}}*/).then(resp=>{
            res.send({status:"success",msg:"All user details",data:resp})
        }).catch(err=>{
            logger.error({status:"unsucess",msg:err,data:{}})
            res.send({status:"unsuccess",msg:'unable to get user details',data:{}})
        })


    }catch(err){
        console.log(err);
        logger.error({status:"unsucess",msd:err,data:{}})
        res.send({status:"unsuccess",msg:'unable to get user details',data:{}})
    }

}
exports.sample = async function (req, res) {
    let data = {
        userFirstName: "user",
        userLastName: 's',
        userEmail: "1234@gmail.com",
        mobileNumber: '1234567890',
        userName: "user",
        userPassword: "user",
        isAdmin: '0'

    }
    await user.create(data)

}
