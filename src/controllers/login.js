import { v4 as uuid } from 'uuid';
import internalErrorResponse from '../helpers/serverError.js';
import { loginSchema } from '../validation/schemas.js';
import { searchUser } from '../data/usersTable.js';
import { insertSession } from '../data/sessionsTable.js';
import { isCorrectPassword } from '../helpers/passwordEncrypt.js';

const route = '/login';

async function postLogin(request, response) {
	const loginValidationError = loginSchema.validate(request.body).error;

	if (loginValidationError) {
		return response.status(400).send(loginValidationError.message);
	}

	try {
		const user = await searchUser(request.body.email);

		if (user.rowCount === 0) {
			return response.sendStatus(404);
		}

		if (!isCorrectPassword(request.body.password, user.rows[0].password)) {
			return response.sendStatus(404);
		}

		const token = uuid();
		await insertSession(user.rows[0].id, token);

		return response.status(200).send({
			id: user.rows[0].id,
			name: user.rows[0].name,
			token,
			planType: user.rows[0].planType,
		});
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const login = {
	route,
	postLogin,
};

export default login;
