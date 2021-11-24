import { searchSession } from '../repositories/sessionsTable.js';
import internalErrorResponse from '../helpers/serverError.js';
import { isInvalidToken } from '../validation/schemas.js';

async function tokenMiddleware(request, response, next) {
	const { authorization } = request.headers;
	const token = authorization.replace('Bearer ', '');

	const invalidToken = isInvalidToken({ token });

	if (invalidToken) {
		return response.status(400).send(invalidToken.message);
	}

	try {
		const session = await searchSession(token);

		if (session.rowCount === 0) {
			return response.sendStatus(401);
		}

		return next();
	} catch (error) {
		return internalErrorResponse(error);
	}
}

export default tokenMiddleware;
