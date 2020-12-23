import Joi from 'Joi'

const nodesValidationSchema = Joi.object({
    id: Joi.string(),
    shortName: Joi.string().required(),
    name: Joi.string().required(),
    longitude: Joi.string().required(),
    latitude: Joi.string().required(),
    collectionNode: Joi.boolean().required(),
    surrenderNode: Joi.boolean().required()
})

export {nodesValidationSchema};