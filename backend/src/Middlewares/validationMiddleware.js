
import { createRequire } from 'module'; 
const require = createRequire(import.meta.url); 
const Joi = require('joi'); 

// Registration  validation 
const validateRegister = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            'string.base': '"Name" should be a type of "text"',
            'string.empty': '"Name" cannot be empty',
            'string.min': '"Name" should have a minimum length of {#limit}',
            'any.required': '"Name" is required'
        }),
        email: Joi.string().email().required().messages({
            'string.email': '"Email" must be a valid email address',
            'any.required': '"Email" is required'
        }),
        password: Joi.string().min(6).max(100).required().messages({
            'string.base': '"Password" should be a type of "text"',
            'string.min': '"Password" should have a minimum length of {#limit}',
            'any.required': '"Password" is required'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details.map(detail => detail.message),
        });
    }
    next();
};


// Login validation  
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': '"Email" must be a valid email address',
            'any.required': '"Email" is required'
        }),
        password: Joi.string().min(6).max(100).required().messages({
            'string.base': '"Password" should be a type of "text"',
            'string.min': '"Password" should have a minimum length of {#limit}',
            'any.required': '"Password" is required'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details.map(detail => detail.message),
        });
    }
    next();
};








export { validateRegister , loginValidation };



