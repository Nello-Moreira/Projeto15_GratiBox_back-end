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

const loginSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net', 'br'] },
		})
		.required(),
	password: Joi.string().min(1).required(),
}).max(2);

const tokenSchema = Joi.object({
	token: Joi.string().guid({ version: ['uuidv4'] }).required,
}).max(1);

const planTypeSchema = Joi.object({
	planType: Joi.string().min(1).required(),
}).max(1);

export { loginSchema, signUpSchema, tokenSchema, planTypeSchema };
