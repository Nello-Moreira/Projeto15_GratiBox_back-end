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

	if (plan === false) {
		const createdPlan = await planRepository.insertPlan({
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
function formatPlanOptions(planOptions) {
	const formattedPlanOptions = [];
	let formattedOption;

	planOptions.forEach((option) => {
		formattedOption = formattedPlanOptions.find(
			(obj) => obj.planId === option.planId
		);
		if (formattedOption) {
			return formattedOption.deliveryOptions.push(option.deliveryOption);
		}
		return formattedPlanOptions.push({
			planId: option.planId,
			planType: option.planType,
			deliveryOptions: [option.deliveryOption],
		});
	});

	return formattedPlanOptions;
}

async function getPlanOptions() {
	const plans = await planRepository.searchPlanOptions();

	if (!plans) {
		return null;
	}

	if (plans.rowCount === 0) {
		return false;
	}

	return formatPlanOptions(plans.rows);
}

export default { setUserPlan, getPlanOptions };
