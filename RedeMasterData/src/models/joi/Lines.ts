import Joi from 'Joi'

const LinesValidationSchema = Joi.object({
    id: Joi.string(),
    code: Joi.string().required(),
    name: Joi.string().required(),
    color: Joi.string().required(),
    beginNode: Joi.string(),
    finalNode: Joi.string(),
    lineRoutes: Joi.array().items({
        routeId: Joi.string().required(),
        orientation: Joi.string().required()
    }).required(),
    tripulantType: Joi.array().items(Joi.string()).required(),
    vehicleType: Joi.array().items(Joi.string()).required()
})

export {LinesValidationSchema};