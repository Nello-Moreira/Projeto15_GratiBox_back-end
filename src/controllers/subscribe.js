import internalErrorResponse from '../helpers/serverError.js';
import searchPlan from '../data/plansTable.js';
import { updateUserPlan } from '../data/usersPlansTable.js';
import { insertSelectedProducts } from '../data/usersProductsTable.js';
import insertAddress from '../data/addressesTable.js';
import { searchUserByToken } from '../data/usersTable.js';

const route = '/subscribe';

async function postSubscription(request, response) {
	const { authorization } = request.headers;
	const token = authorization.replace('Bearer ', '');
	const { planType, deliveryOption, selectedProducts, address } = request.body;

	try {
		const planId = (await searchPlan(planType.toLowerCase())).rows[0].id;

		const userId = await searchUserByToken(token);

		await updateUserPlan({
			userId,
			planId,
			deliveryOption,
		});

		await insertSelectedProducts({ userId, selectedProducts });
		await insertAddress({ userId, address });

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
