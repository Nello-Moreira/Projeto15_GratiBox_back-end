import internalErrorResponse from '../helpers/serverError.js';
import searchDeliveryOptions from '../data/deliveryOptionsTable.js';

const route = '/plan-options';

async function getPlanOptions(request, response) {
	const { planType } = request.query;

	try {
		const options = await searchDeliveryOptions(planType.toLowerCase());

		if (options.rowCount === 0) {
			return response.sendStatus(204);
		}

		return response.status(200).send(options.rows);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const planOptions = {
	route,
	getPlanOptions,
};

export default planOptions;
