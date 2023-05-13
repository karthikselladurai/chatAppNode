const joi = require('joi');
const registerSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    mobile_number: joi.number().allow(null),
    email_id: joi.string().email().required(),
    user_name: joi.string().required(),
    password: joi.string().min(4).required(),
    is_admin: joi.boolean()
})
const loginSchema = joi.object({
    user_name: joi.string().required(),
    password: joi.string().required()
})
module.exports = {
    registerSchema,
    loginSchema
};