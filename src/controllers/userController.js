import { v4 as uuid } from 'uuid';
import userRepository from '../repositories/userRepository.js';
import { isInvalidLogin, isInvalidSignUp } from '../validation/schemas.js';
import { isCorrectPassword, hashPassword } from '../helpers/passwordEncrypt.js';
import planController from './planController.js';

async function login(request, response) {
	const loginBody = request.body;
	const invalidLogin = isInvalidLogin(loginBody);

	if (invalidLogin) {
		return response.status(400).send(invalidLogin.message);
	}

	const user = await userRepository.searchUserByEmail(loginBody.email);

	if (!user) return response.sendStatus(500);

	if (user.rowCount === 0) {
		return response.sendStatus(404);
	}

	if (
		!isCorrectPassword({
			password: loginBody.password,
			hashedPassword: user.rows[0].password,
		})
	) {
		return response.sendStatus(404);
	}

	const token = uuid();

	const createdSession = await userRepository.insertSession({
		userId: user.rows[0].id,
		token,
	});

	if (!createdSession) return response.sendStatus(500);

	return response.status(200).send({ token });
}

async function signUp(request, response) {
	const signUpBody = request.body;
	const invalidSignUp = isInvalidSignUp(signUpBody);

	if (invalidSignUp) {
		return response.status(400).send(invalidSignUp.message);
	}

	const user = await userRepository.searchUserByEmail(signUpBody.email);

	if (!user) return response.sendStatus(500);

	if (user.rowCount !== 0) {
		return response.sendStatus(409);
	}

	signUpBody.password = hashPassword(signUpBody.password);

	const userId = await userRepository.insertUser(signUpBody);

	if (!userId) return response.sendStatus(500);

	const createdNotSubscribedPlan = await planController.setUserPlan({
		userId: userId.rows[0].id,
	});

	if (!createdNotSubscribedPlan) return response.sendStatus(500);

	return response.sendStatus(201);
}

export default { login, signUp };