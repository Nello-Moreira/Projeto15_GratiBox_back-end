import internalErrorResponse from '../helpers/serverError.js';
import signUpSchema from '../validation/schemas.js';
import { searchUser, insertUser } from '../data/usersTable.js';
import { hashPassword } from '../helpers/passwordEncrypt.js';

const route = '/sign-up';

async function postRoute(request, response) {
	const signUpValidationError = signUpSchema.validate(request.body).error;

	if (signUpValidationError) {
		return response.status(400).send(signUpValidationError.message);
	}

	try {
		const user = await searchUser(request.body.email);

		if (user.rowCount > 0) {
			return response.sendStatus(409);
		}
		request.body.password = hashPassword(request.body.password);
		await insertUser(request.body);
		return response.sendStatus(201);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const signup = {
	route,
	postRoute,
};

export default signup;
