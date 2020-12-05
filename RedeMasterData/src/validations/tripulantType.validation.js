const Joi = require('joi');

const tripulantTypesValidationSchema = new Joi.object({
    id: Joi.string(),
    id: Joi.string(),
    description: Joi.string().required()
})

module.exports = tripulantTypesValidationSchema;