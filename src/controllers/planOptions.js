import internalErrorResponse from '../helpers/serverError.js';

const route = '/plan-options';

async function getPlanOptions(request, response) {
	const { planType } = request.query;

	try {
		return response.sendStatus(501);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const planOptions = {
	route,
	getPlanOptions,
};

export default planOptions;
