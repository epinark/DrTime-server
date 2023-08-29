import Joi from 'joi';

export const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(12).required(),
    birthDate: Joi.date(),
    contactInfo: Joi.object({
        telefon: Joi.number(),
        PLZ: Joi.number(),
        City: Joi.string()
    }),
    insuranceNumber: Joi.string(),
    gender: Joi.string()
});

export const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(12).required()
});