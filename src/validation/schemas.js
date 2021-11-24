import Joi from 'joi';

const signUpSchema = Joi.object({
	name: Joi.string().min(1).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net', 'br'] },
		})
		.required(),
	password: Joi.string().min(1).required(),
}).max(3);

const signUpValidation = (input) => signUpSchema.validate(input).error;

const loginSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net', 'br'] },
		})
		.required(),
	password: Joi.string().min(1).required(),
}).max(2);

const loginValidation = (input) => loginSchema.validate(input).error;

const tokenSchema = Joi.object({
	token: Joi.string().guid({ version: ['uuidv4'] }),
}).max(1);

const tokenValidation = (input) => tokenSchema.validate(input).error;

const planIdSchema = Joi.object({
	planId: Joi.number().integer().greater(1).required(),
}).max(1);

const planIdValidation = (input) => planIdSchema.validate(input).error;

export { signUpValidation, loginValidation, tokenValidation, planIdValidation };
