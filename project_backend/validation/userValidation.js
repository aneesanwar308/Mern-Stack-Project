const joi = require("joi")

const validation = (user) => {
    const validSchema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "io", "co", "pk", "net"] } }),
        age: joi.number().integer().min(18).max(60),
        cell_no: joi.string().min(3),
        isDeleted: joi.boolean(),
        created_at: joi.date()
    })
    return validSchema.validate(user)
}

const validatedUser = (validator) => {
    return (req, res, next) => {
        const { error } = validator(req.body)
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message })
        }
        next()
    }
}

module.exports = {
    validation,
    validatedUser
}