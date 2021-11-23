import internalErrorResponse from '../helpers/serverError.js';
import { signUpSchema } from '../validation/schemas.js';
import { searchUser, insertUser } from '../data/usersTable.js';
import { insertNewUserPlan } from '../data/usersPlansTable.js';
import { hashPassword } from '../helpers/passwordEncrypt.js';

const route = '/sign-up';

async function postSignUp(request, response) {
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
		const userId = Number((await insertUser(request.body)).rows[0].id);
		await insertNewUserPlan(userId);
		return response.sendStatus(201);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const signup = {
	route,
	postSignUp,
};

export default signup;
