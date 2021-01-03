import Joi from 'joi'

const LinePatchValidationSchema = Joi.object({
    routeId: Joi.string().required(),
    orientation: Joi.string().required()
})

export { LinePatchValidationSchema };