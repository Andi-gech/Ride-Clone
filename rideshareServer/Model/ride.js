const mongoose = require('mongoose');
const joi = require('joi');
const rideSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
       
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
       
    },

    startLocation: {
        latitude: {
            type: Number,
            required: true
           
        },
        longitude: {
            type: Number,
            required: true
          
        }
    },
    endLocation: {
        latitude: {
            type: Number,
            required: true        
        },
        longitude: {
            type: Number,
            required: true
        
        }
    },
    State: {
        type: String,

        default: 'Requested'
    }

})
const Ride = mongoose.model('Ride', rideSchema)

const rideValidation = joi.object({
    driver: joi.string(),
    user: joi.string().required(),
    startLocation: joi.object().required(),
    endLocation: joi.object().required(),
    State: joi.string(),
})
const rideUpdateValidation = joi.object({
    driver: joi.string(),
    user: joi.string(),
    startLocation: joi.object(),
    endLocation: joi.object(),
    State: joi.string(),
})
const validateRide = (ride) => {
    return rideValidation.validate(ride)
}
const validateRideUpdate = (ride) => {
    return rideUpdateValidation.validate(ride)
}

module.exports.Ride = Ride
module.exports.validateRide = validateRide
module.exports.validateRideUpdate = validateRideUpdate