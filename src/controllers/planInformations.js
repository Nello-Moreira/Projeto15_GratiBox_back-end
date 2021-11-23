import internalErrorResponse from '../helpers/serverError.js';
import { searchPlanInformations } from '../data/usersPlansTable.js';
import { searchSelectedProducts } from '../data/usersProductsTable.js';

import calculateNextDeliveries from '../helpers/nextDeliveries.js';

const route = '/plan-informations';

async function getPlanInformations(request, response) {
	const { userId } = request.query;

	try {
		const planInformationsQuery = await searchPlanInformations(userId);

		if (planInformationsQuery.rowCount === 0) {
			return response.sendStatus(204);
		}

		const planInformations = planInformationsQuery.rows[0];

		planInformations.nextDeliveries = await calculateNextDeliveries(
			userId,
			planInformations
		);

		planInformations.products = (await searchSelectedProducts(userId)).rows.map(
			(product) => product.name
		);

		return response.status(200).send(planInformations);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const planInformations = {
	route,
	getPlanInformations,
};

export default planInformations;
