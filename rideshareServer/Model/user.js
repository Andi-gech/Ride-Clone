const mongoose=require("mongoose")
const joi = require("joi");

const userSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    password: String,
    country: String,

})

const User = mongoose.model('User', userSchema)
const userValidation = joi.object({
    name: joi.string(),
    phone: joi.number().required(),
 
    country: joi.string(),
})
const userUpdateValidation = joi.object({
    name: joi.string(),
    phone: joi.number(),
    password: joi.string(),
    country: joi.string(),
})
const validateuser = (user) => {
    return userValidation.validate(user)
}
const validateuserUpdate = (user) => {
    return userUpdateValidation.validate(user)
}

module.exports.User = User
module.exports.validateuser = validateuser
module.exports.validateuserUpdate = validateuserUpdate
