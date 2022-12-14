const joi = require('joi');


const registerSchema = joi.object({
    userFirstName: joi.string().required(),
    userLastName: joi.string().required(),
    mobileNumber: joi.number().required(),
    userEmail: joi.string().email().required(),
    userName: joi.string().required(),
    userPassword: joi.string().required(),
    isAdmin: joi.boolean()
})
const loginSchema = joi.object({
    userName: joi.string().required(),
    userPassword: joi.string().required()
})
module.exports = {
    registerSchema,
    loginSchema
};