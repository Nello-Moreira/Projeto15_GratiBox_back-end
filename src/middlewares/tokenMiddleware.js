import { searchSession } from '../data/sessionsTable.js';
import internalErrorResponse from '../helpers/serverError.js';
import { tokenSchema } from '../validation/schemas.js';

async function tokenMiddleware(request, response, next) {
	const { authorization } = request.headers;
	const token = authorization.replace('Bearer ', '');

	const tokenValidationError = tokenSchema.validate({ token }).error;

	if (tokenValidationError) {
		return response.status(400).send(tokenValidationError.message);
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
