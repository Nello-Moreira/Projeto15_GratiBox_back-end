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

export default { setUserPlan };
