const moment = require('moment');
const user = require('../model/model');
const logger = require('../../services/logger');
const jwt = require('jsonwebtoken')
const env = process.env
const { loginSchema, registerSchema } = require('../../middleware/joiValidation');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/DBcon');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const crypto = require("crypto");
const { log } = require('console');
const randomId = () => crypto.randomBytes(5).toString("hex");
const { OAuth2Client } = require('google-auth-library');
const generatePassword = require('generate-password');
const CLIENT_ID = '1013285214656-kpm30t477s6aeslmihptdd9f5598o68e.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
let UsernameGenerator = require('username-generator');
const {createChatList} = require('../../chat/controler')
module.exports = {

    login: async (req) => {
        let startTime = moment().format('HH:mm:ss')
        logger.info({ time: `${startTime}`, message: ` login process start` });
        console.log(req.body.tokenId);


        try {
            if (req.body.tokenId) {
                const googleResp = await verify(req.body.tokenId)
                console.log("googleResp >>>>>>>>>>>> ", googleResp);
                if (googleResp) {
                    return googleResp
                }
            }
            console.log(req.body);
            let condition = { email_id: req.body.email_id }
            if (req.body.user_name && req.body.user_name != undefined) {
                condition = { user_name: req.body.user_name }
            }
            console.log("condition ", condition);
            const resp = await user.findOne({
                where:
                    condition,
                attributes: ['id', 'first_name', 'last_name', 'mobile_number', 'email_id', 'user_name', 'password', 'is_admin']
            })
            console.log("resp ", resp);
            if (resp) {
                const passwordValid = await bcrypt.compare(req.body.password, resp.dataValues.password);
                if (passwordValid) {
                    const resp = await user.findOne({
                        where:
                            condition,
                        attributes: ['id', 'first_name', 'last_name', 'mobile_number', 'email_id', 'user_name', 'is_admin']
                    })
                    token = jwt.sign({ id: resp.dataValues.id }, env.SECRET, { expiresIn: "24h" });
                    return ({ status: "success", data: resp, token: token });
                } else {
                    return ({ status: "unsuccess", message: "invalid password", data: {} })
                }
            } else {
                return ({ status: "unsuccess", message: "invalid user", data: {} })
            }
        }
        catch (err) {
            console.log(err);
            logger.error({ status: "unsuccess", error: err })
        }
        let endTime = moment().format('HH:mm:ss')
        logger.info({ time: `${endTime}`, message: ` login process end` })
    },
    registration: async (req) => {
        let startTime = moment().format('HH:mm:ss')
        logger.info({ time: `${startTime}`, message: ` register process start` })
        let resp = await regAssist(req);
        return resp


        let endTime = moment().format('HH:mm:ss')
        logger.info({ time: `${endTime}`, message: ` register process end` })

    },
    getAllUser: async (req, res) => {
        try {
            resp = await user.findAll({ where: { id: { [Sequelize.Op.not]: req.params['id'] } } }).then(resp => {
                return ({ status: "success", msg: "All user details", data: resp })
            }).catch(err => {
                logger.error({ status: "unsuccess", msg: err, data: {} })
                return ({ status: "unsuccess", msg: 'unable to get user details', data: {} })
            })


        } catch (err) {
            console.log(err);
            logger.error({ status: "unsuccess", msd: err, data: {} })
            return ({ status: "unsuccess", msg: 'unable to get user details', data: {} })
        }

    }
}


const sample = async function (req, res) {
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

async function regAssist(req) {
    try {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ");
        req = req.body
        // console.log(env.SALT);
        let insertData = {
            first_name: req.first_name,
            last_name: req.last_name,
            email_id: req.email_id,
            mobile_number: req.mobile_number,
            user_name: req.user_name,
            password: await bcrypt.hash(req.password, parseInt(env.SALT)),
            is_admin: req.is_admin
        }
        let validateResult = await registerSchema.validate(insertData);
        if (validateResult.error) {
            console.log("validateResult.error.details[0].message >>>>>>>>>>>>>>>>>>>>>> ", validateResult.error.details[0].message);
            return ({ status: "success", msg: validateResult.error.details[0].message, data: {} })
        } else {
            console.log("req.user_name  ", req.user_name);
            let resp = await user.findOne({ where: { user_name: req.user_name } })
            // .then( (result) => {
            //     if (result == null || result.length == 0) {
            //          user.create(insertData
            //         ).then((resp) => {
            //             console.log("result ",resp);
            //             return ({ status: "success", msg: "register successfully", data: {} })

            //         }).catch(err => {
            //             console.log(err)
            //             return ({ status: "success", error: err, data: {} })
            //         })
            //     } else {
            //         return ({ status: "success", msg: "user name already exits ", data: {} })
            //     }
            // }).catch(err => { console.log(err) });
            console.log(resp);
            if (resp != null || resp != undefined) {
                return ({ status: "Unsuccess", msg: "user name already exits ", data: {} })
            }
           resp = await user.create(insertData);
            console.log("signUpresp ", resp);
            // if(resp === null || resp === undefined){
            //     return ({ status: "success", msg: "user name already exits ", data: {} })
            // }
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> user_id",resp.dataValues.id);
            createChatList({body:{user_id:resp.dataValues.id}})
            return ({ status: "success", msg: "register successfully", data: {} })
        }
    } catch (err) {
        console.log(err);
    }

}

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log(">>>>>>>>>>>>>>>>>> payload ", payload);
    let resp = await user.findOne({
        where: { email_id: payload.email },
        attributes: ['id', 'first_name', 'last_name', 'mobile_number', 'email_id', 'user_name', 'is_admin']
    })
    console.log("resp>>>>>>>>>>>>>> ", resp);
    if (resp === null) {
        data = {
            body: {
                first_name: payload.given_name,
                last_name: payload.family_name,
                email_id: payload.email,
                mobile_number: null,
                user_name: UsernameGenerator.generateUsername(`${payload.given_name}`),
                password: generatePassword.generate({
                    length: 12,
                    numbers: true,
                    symbols: true
                }),
                is_admin: false
            }
        }
        console.log(data.body.password);
        resp = await regAssist(data)
        if (resp.status === 'Unsuccess') {
            console.log("failed");
        }

    }
    resp = await user.findOne({
        where: { email_id: payload.email },
        attributes: ['id', 'first_name', 'last_name', 'mobile_number', 'email_id', 'user_name', 'is_admin']
    })
    token = jwt.sign({ name: payload.given_name }, env.SECRET, { expiresIn: "24h" });
    return ({ status: "success", data: resp, token: token });
    // verify(token)

    //   const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}

// module.exports = {
//     login,
//     registration,
//     getAllUser
// }
