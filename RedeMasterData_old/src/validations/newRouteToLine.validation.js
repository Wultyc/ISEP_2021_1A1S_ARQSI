const Joi = require('joi');

const newRouteToLineValidationSchema = new Joi.object({
    lineId: Joi.string().required(),
    orientation: Joi.string().required(),
    route: Joi.object({
        isReinforcementRoute: Joi.boolean(),
        isEmptyRoute: Joi.boolean(),
        routeNodes: Joi.array().items({
            nodeId: Joi.string().required(),
            distance: Joi.number(),
            duration: Joi.number()
        }).required()
    })
    
})

module.exports = newRouteToLineValidationSchema;