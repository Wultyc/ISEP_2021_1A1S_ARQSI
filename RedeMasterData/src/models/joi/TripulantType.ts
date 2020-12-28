import Joi from 'Joi'

const tripulantTypesValidationSchema = Joi.object({
    id: Joi.string(),
    description: Joi.string().required()
})

export {tripulantTypesValidationSchema};