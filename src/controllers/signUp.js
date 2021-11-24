import internalErrorResponse from '../helpers/serverError.js';
import { isInvalidSignUp } from '../validation/schemas.js';
import { searchUserByEmail, insertUser } from '../repositories/usersTable.js';
import { insertNewUserPlan } from '../repositories/usersPlansTable.js';
import { hashPassword } from '../helpers/passwordEncrypt.js';

const route = '/sign-up';

async function postSignUp(request, response) {
	const invalidSignUp = isInvalidSignUp(request.body);

	if (invalidSignUp) {
		return response.status(400).send(invalidSignUp.message);
	}

	try {
		const user = await searchUserByEmail(request.body.email);

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
