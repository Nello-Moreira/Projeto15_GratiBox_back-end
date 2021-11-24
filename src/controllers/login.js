import { v4 as uuid } from 'uuid';
import internalErrorResponse from '../helpers/serverError.js';
import { isInvalidLogin } from '../validation/schemas.js';
import { searchUserByEmail } from '../repositories/usersTable.js';
import { insertSession } from '../repositories/sessionsTable.js';
import { searchPlanInformations } from '../repositories/usersPlansTable.js';
import { isCorrectPassword } from '../helpers/passwordEncrypt.js';

const route = '/login';

async function postLogin(request, response) {
	const invalidLogin = isInvalidLogin(request.body);

	if (invalidLogin) {
		return response.status(400).send(invalidLogin.message);
	}

	try {
		const user = await searchUserByEmail(request.body.email);

		if (user.rowCount === 0) {
			return response.sendStatus(404);
		}

		if (!isCorrectPassword(request.body.password, user.rows[0].password)) {
			return response.sendStatus(404);
		}

		const token = uuid();
		await insertSession(user.rows[0].id, token);
		const planInformations = (await searchPlanInformations(token)).rows[0];

		return response.status(200).send({
			token,
			...planInformations,
		});
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

export default { route, postLogin };
