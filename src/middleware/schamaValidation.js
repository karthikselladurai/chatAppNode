const joi = require('joi');



const user = joi.object({
    userName: joi.string().required(),
    userEmail: joi.string().required(),
    mobileNumber: joi.number().required(),
    userId: joi.number().required(),
    userPassword: joi.string().required(),
    isAdmin: joi.boolean()
})
module.exports = {"userSchemaValidation":user }  