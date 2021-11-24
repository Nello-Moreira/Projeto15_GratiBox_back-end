import planRepository from '../repositories/planRepository.js';

async function isRegisteredUser(userId) {
	const plan = await planRepository.searchUserPlan(userId);

	if (!plan) {
		return null;
	}

	if (plan.rowCount === 0) {
		return false;
	}

	return true;
}

async function setUserPlan({ userId, planId = 1, deliveryOption = 1 }) {
	const plan = await isRegisteredUser(userId);

	if (plan === null) {
		return null;
	}

	if (!plan) {
		const createdPlan = planRepository.insertPlan({
			userId,
			planId,
			deliveryOption,
			subscriptionDate: null,
		});

		if (!createdPlan) {
			return null;
		}

		return true;
	}

	const upatedPlan = planRepository.updatePlan({
		userId,
		planId,
		deliveryOption,
		subscriptionDate: new Date(),
	});

	if (!upatedPlan) {
		return null;
	}

	return true;
}

async function getProducts(request, response) {
	const products = await planRepository.searchProducts();

	if (!products) {
		return response.sendStatus(500);
	}

	if (products.rowCount === 0) {
		return response.sendStatus(204);
	}

	return response.status(200).send(products.rows);
}

export default { setUserPlan, getProducts };
