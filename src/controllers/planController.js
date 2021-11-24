import planService from '../services/planService.js';

async function getPlanOptions(request, response) {
	return response.sendStatus(501);
}

async function getDeliveryOptions(request, response) {
	return response.sendStatus(501);
}

export default { getPlanOptions, getDeliveryOptions };
