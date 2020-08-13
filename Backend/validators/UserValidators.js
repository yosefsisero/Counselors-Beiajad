const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]:Joi.object().keys({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            age: Joi.number().required(),
            comunity: Joi.string().required(),
            country: Joi.string().required(),
            tel: Joi.number().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
    change: celebrate({
        [Segments.BODY]:Joi.object().keys({
            tel: Joi.number(),
            country: Joi.string(),
            email: Joi.string(),
        }),
    }),
};