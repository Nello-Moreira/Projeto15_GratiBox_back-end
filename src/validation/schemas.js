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

const isInvalidSignUp = (input) => signUpSchema.validate(input).error;

const loginSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net', 'br'] },
		})
		.required(),
	password: Joi.string().min(1).required(),
}).max(2);

const isInvalidLogin = (input) => loginSchema.validate(input).error;

const tokenSchema = Joi.object({
	token: Joi.string().guid({ version: ['uuidv4'] }),
}).max(1);

const isInvalidToken = (input) => tokenSchema.validate(input).error;

const subscriptionSchema = Joi.object({
	planTypeId: Joi.number().min(1).required(),
	deliveryOptionId: Joi.number().min(1).required(),
	// eslint-disable-next-line newline-per-chained-call
	productsList: Joi.array().items(Joi.number().min(1)).min(1).max(3).required(),
	address: Joi.object({
		receiverName: Joi.string().min(1).required(),
		zipCode: Joi.string()
			.pattern(/[0-9]{5}-[0-9]{3}/)
			.required(),
		streetName: Joi.string().min(1).required(),
		city: Joi.string().min(1).required(),
		stateId: Joi.number().min(1).required(),
	}),
});

const isInvalidSubscription = (input) =>
	// eslint-disable-next-line implicit-arrow-linebreak
	subscriptionSchema.validate(input).error;

export {
	isInvalidSignUp,
	isInvalidLogin,
	isInvalidToken,
	isInvalidSubscription,
};
