import internalErrorResponse from '../helpers/serverError.js';
import searchPlan from '../data/plansTable.js';
import { updateUserPlan } from '../data/usersPlansTable.js';
import { insertSelectedProducts } from '../data/usersProductsTable.js';
import insertAddress from '../data/addressesTable.js';

const route = '/subscribe';

async function postSubscription(request, response) {
	const { authorization } = request.headers;
	const token = authorization.replace('Bearer ', '');
	const subscriptionBody = request.body;

	try {
		const planId = (await searchPlan(subscriptionBody.planType.toLowerCase()))
			.rows[0].id;

		await updateUserPlan(token, planId, subscriptionBody.deliveryOption);

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
