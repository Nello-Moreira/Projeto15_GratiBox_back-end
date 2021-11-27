import planService from '../services/planService.js';
import { isInvalidSubscription } from '../validation/schemas.js';

async function getPlanOptions(request, response) {
	const planOptions = await planService.getPlanOptions();

	if (planOptions === null) {
		return response.sendStatus(500);
	}

	if (planOptions === false) {
		return response.sendStatus(204);
	}

	return response.status(200).send(planOptions);
}

async function getUserPlanInformations(request, response) {
	const { userId } = request.locals;

	const planInformations = await planService.getUserPlanInformations({
		userId,
	});

	if (planInformations === null) {
		return response.sendStatus(500);
	}

	if (planInformations === false) {
		return response.sendStatus(204);
	}

	return response.status(200).send(planInformations);
}

async function subscribe(request, response) {
	const { userId } = request.locals;
	const subscription = request.body;

	const invalidSubscription = isInvalidSubscription(subscription);

	if (invalidSubscription) {
		return response.status(400).send(invalidSubscription.message);
	}

	const subscribed = await planService.subscribeUser({
		...subscription,
		userId,
	});

	if (subscribed === false) {
		return response.status(409).send('User is already subscribed');
	}

	if (subscribed === null) {
		return response.sendStatus(500);
	}

	return response.sendStatus(201);
}

export default { getPlanOptions, getUserPlanInformations, subscribe };
