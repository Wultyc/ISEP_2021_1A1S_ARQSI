const Joi = require('joi');

const vehicleTypesValidationSchema = new Joi.object({
    id: Joi.string(),
    description: Joi.string().required(),
    autonomy: Joi.number().required(),
    costPerKilometer: Joi.number().required(),
    averageCost: Joi.number().required(),
    averageSpeed: Joi.number().required(),
    fuelType: Joi.string().required()
})

module.exports = vehicleTypesValidationSchema;