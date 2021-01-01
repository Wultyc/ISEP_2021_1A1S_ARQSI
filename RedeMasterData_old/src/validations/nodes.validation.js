const Joi = require('joi');

const nodesValidationSchema = new Joi.object({
    id: Joi.string(),
    shortName: Joi.string().required(),
    name: Joi.string().required(),
    longitude: Joi.string().required(),
    latitude: Joi.string().required(),
    collectionNode: Joi.boolean().required(),
    surrenderNode: Joi.boolean().required()
})

module.exports = nodesValidationSchema;