import planService from '../services/planService.js';

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

	const planInformations = await planService.getUserPlanInformations(userId);

	if (planInformations === null) {
		return response.sendStatus(500);
	}

	if (planInformations === false) {
		return response.sendStatus(204);
	}

	return response.status(200).send(planInformations);
}

export default { getPlanOptions, getUserPlanInformations };
