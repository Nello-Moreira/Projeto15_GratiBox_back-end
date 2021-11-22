import internalErrorResponse from '../helpers/serverError.js';
import { searchSession } from '../data/sessionsTable.js';
import searchPlan from '../data/plansTable.js';
import { updateUser } from '../data/usersTable.js';

const route = '/subscribe';

async function postSubscription(request, response) {
	const subscriptionBody = request.body;
	const { authorization } = request.headers;
	const token = authorization.replace('Bearer ', '');

	try {
		const userId = (await searchSession(token)).rows[0].user_id;
		const planId = (await searchPlan(subscriptionBody.planType.toLowerCase()))
			.rows[0].id;

		await updateUser(userId, planId);

		return response.sendStatus(200);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const subscribe = {
	route,
	postSubscription,
};

export default subscribe;
