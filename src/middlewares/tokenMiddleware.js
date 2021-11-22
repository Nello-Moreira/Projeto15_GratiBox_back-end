import { searchSession } from '../data/sessionsTable.js';

async function tokenMiddleware(request, response, next) {
	const { authorization } = request.headers;
	const token = authorization.replace('Bearer ', '');

	const session = await searchSession(token);

	if (session.rowCount === 0) {
		return response.sendStatus(401);
	}

	return next();
}

export default tokenMiddleware;
