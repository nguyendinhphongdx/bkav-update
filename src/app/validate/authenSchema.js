const Joi = require('@hapi/joi');

const authuShema = Joi.object({
    username: Joi.string().alphanum().min(6).max(100),
    password: Joi.string().required(),
})

module.exports ={
    authuShema,
}