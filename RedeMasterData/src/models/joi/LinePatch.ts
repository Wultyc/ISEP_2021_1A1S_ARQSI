import Joi from 'Joi'

const LinePatchValidationSchema = Joi.object({
    routeId: Joi.string().required(),
    orientation: Joi.string().required()
})

export { LinePatchValidationSchema };