import userService from '../services/userService.js';
import { isInvalidLogin, isInvalidSignUp } from '../validation/schemas.js';

async function login(request, response) {
	const loginBody = request.body;
	const invalidLogin = isInvalidLogin(loginBody);

	if (invalidLogin) {
		return response.status(400).send(invalidLogin.message);
	}

	const token = await userService.authenticate(loginBody);

	if (token === null) {
		return response.sendStatus(500);
	}

	if (token === false) {
		return response.sendStatus(404);
	}

	return response.status(200).send({ token });
}

async function signUp(request, response) {
	const signUpBody = request.body;
	const invalidSignUp = isInvalidSignUp(signUpBody);

	if (invalidSignUp) {
		return response.status(400).send(invalidSignUp.message);
	}

	const user = await userService.registerUser(signUpBody);

	if (user === null) {
		return response.sendStatus(500);
	}

	if (user === false) {
		return response.sendStatus(409);
	}

	return response.sendStatus(201);
}

export default { login, signUp };
