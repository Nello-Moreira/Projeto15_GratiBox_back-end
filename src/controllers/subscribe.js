import internalErrorResponse from '../helpers/serverError.js';
import searchPlan from '../data/plansTable.js';
import { updateUser } from '../data/usersTable.js';
import insertSelectedProducts from '../data/usersProductsTable.js';
import insertAddress from '../data/addressesTable.js';

const route = '/subscribe';

async function postSubscription(request, response) {
	const subscriptionBody = request.body;

	try {
		const planId = (await searchPlan(subscriptionBody.planType.toLowerCase()))
			.rows[0].id;

		await updateUser({
			...subscriptionBody,
			planId,
		});

		await insertSelectedProducts(subscriptionBody);
		await insertAddress(subscriptionBody);

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
