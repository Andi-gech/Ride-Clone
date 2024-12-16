const mongoose = require('mongoose');
const joi = require('joi');
const diverSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    password: String,
    country: String,
    plateNo: String,
    carType: String,
    available: {
        type: Boolean,
        default: false
    },
    lastLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // Longitude, Latitude
            default: [0, 0]
            
        }
    }
    


})
const Diver = mongoose.model('Diver', diverSchema)
const diverValidation = joi.object({
    name: joi.string().required(),
    phone: joi.number().required(),
    password: joi.string().required(),
    country: joi.string().required(),
    plateNo: joi.string().required(),
    carType: joi.string().required(),
    available: joi.boolean(),
    LastLocation: {
        latitude: joi.number(),
        longitude: joi.number()
    }

})
const diverUpdateValidation = joi.object({
    name: joi.string(),
    phone: joi.number(),
    password: joi.string(),
    country: joi.string(),
    plateNo: joi.string(),
    carType: joi.string(),
    available: joi.boolean(),
    LastLocation: {
        latitude: joi.number(),
        longitude: joi.number()
    }

})
diverSchema.index({ lastLocation: '2dsphere' });
const validateDiver = (diver) => {
    return diverValidation.validate(diver)
}
const validateDiverUpdate = (diver) => {
    return diverUpdateValidation.validate(diver)

}
module.exports.Diver = Diver
module.exports.validateDiver = validateDiver
module.exports.validateDiverUpdate = validateDiverUpdate