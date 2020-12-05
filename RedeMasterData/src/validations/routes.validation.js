const Joi = require('joi');

const routesValidationSchema = new Joi.object({
    id: Joi.string(),
    distance: Joi.number(),
    duration: Joi.number(),
    isReinforcementRoute: Joi.boolean().required(),
    isEmptyRoute: Joi.boolean().required(),
    routeNodes:Joi.array().items({
        nodeId: Joi.string().required(),
        distance: Joi.number().required(),
        duration: Joi.number().required()
    }).required()
})

module.exports = routesValidationSchema;