import Joi from 'Joi'

const vehicleTypesValidationSchema = Joi.object({
    id: Joi.string(),
    description: Joi.string().required(),
    autonomy: Joi.number().required(),
    costPerKilometer: Joi.number().required(),
    averageCost: Joi.number().required(),
    averageSpeed: Joi.number().required(),
    fuelType: Joi.string().required()
})

export {vehicleTypesValidationSchema};