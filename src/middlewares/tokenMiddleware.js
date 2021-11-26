import userRepository from '../repositories/userRepository.js';
import { isInvalidToken } from '../validation/schemas.js';

async function tokenMiddleware(request, response, next) {
	const { authorization } = request.headers;

	if (!authorization) {
		return response.sendStatus(401);
	}

	const token = authorization.replace('Bearer ', '');

	const invalidToken = isInvalidToken({ token });

	if (invalidToken) {
		return response.sendStatus(401);
	}

	const session = await userRepository.searchSession({ token });

	if (!session) {
		return response.sendStatus(500);
	}

	if (session.rowCount === 0) {
		return response.sendStatus(401);
	}

	request.locals = { userId: session.rows[0].userId };

	return next();
}

export default tokenMiddleware;
