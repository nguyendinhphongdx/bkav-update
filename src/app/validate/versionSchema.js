const Joi = require('@hapi/joi');

const authuShema = Joi.object({
    name: Joi.string().alphanum().min(6).max(100),
    description: Joi.string().alphanum().min(3).max(100)
})

module.exports ={
    authuShema,
}