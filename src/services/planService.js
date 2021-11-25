import planRepository from '../repositories/planRepository.js';
import productService from './productService.js';
import calculateNextDeliveries from '../helpers/nextDeliveries.js';

async function isRegisteredUser({ userId }) {
	const plan = await planRepository.searchUserPlanType({ userId });

	if (!plan) {
		return null;
	}

	if (plan.rowCount === 0) {
		return false;
	}

	return true;
}

async function setUserPlan({ userId, planId, deliveryOption }) {
	const plan = await isRegisteredUser({ userId });

	if (plan === null) {
		return null;
	}

	if (plan === true) {
		return false;
	}

	const createdPlan = await planRepository.insertUserPlan({
		userId,
		planId,
		deliveryOption,
		subscriptionDate: new Date(),
	});

	if (!createdPlan) {
		return null;
	}

	return true;
}

function formatPlanOptions({ planOptions }) {
	const formattedPlanOptions = [];
	let formattedOption;

	planOptions.forEach((option) => {
		formattedOption = formattedPlanOptions.find(
			(obj) => obj.planId === option.planId
		);
		if (formattedOption) {
			return formattedOption.deliveryOptions.push({
				id: option.deliveryOptionId,
				name: option.deliveryOption,
			});
		}
		return formattedPlanOptions.push({
			planId: option.planId,
			planType: option.planType,
			deliveryOptions: [
				{
					id: option.deliveryOptionId,
					name: option.deliveryOption,
				},
			],
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

	return formatPlanOptions({ planOptions: plans.rows });
}

async function getLastDeliveryDate({ userId }) {
	const deliveryDate = await planRepository.searchLastDeliveryDate({ userId });

	if (deliveryDate === null) {
		return null;
	}

	if (deliveryDate.rowCount === 0) {
		return false;
	}

	return deliveryDate.rows[0].date;
}

async function getUserPlanInformations({ userId }) {
	const planInformations = await planRepository.searchUserPlanInformations({
		userId,
	});

	if (!planInformations) {
		return null;
	}

	if (planInformations.rowCount === 0) {
		return false;
	}

	const productsList = await productService.getUserProductsList({ userId });

	if (!productsList) {
		return null;
	}

	const lastDeliveryDate = new Date(
		// eslint-disable-next-line operator-linebreak
		(await getLastDeliveryDate({ userId })) ||
			planInformations.rows[0].subscriptionDate
	);

	const nextDeliveries = calculateNextDeliveries({
		planType: planInformations.rows[0].planType,
		deliveryOption: planInformations.rows[0].deliveryOption,
		lastDeliveryDate,
	});

	return {
		planType: planInformations.rows[0].planType,
		subscriptionDate: planInformations.rows[0].subscriptionDate,
		productsList,
		nextDeliveries,
	};
}

export default { setUserPlan, getPlanOptions, getUserPlanInformations };
