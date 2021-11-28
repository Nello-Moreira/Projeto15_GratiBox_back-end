import planRepository from '../repositories/planRepository.js';
import productService from './productService.js';
import addressService from './addressService.js';
import calculateNextDeliveries from '../helpers/nextDeliveries.js';

async function isSubscriber({ userId }) {
	const planInformations = await planRepository.searchUserPlanByUserId({
		userId,
	});

	if (!planInformations) {
		return null;
	}

	if (planInformations.rowCount === 0) {
		return false;
	}

	return true;
}

function formatPlanOptions({ planOptions }) {
	const formattedPlanOptions = [];
	let formattedOption;

	planOptions.forEach((option) => {
		formattedOption = formattedPlanOptions.find(
			(obj) => obj.planTypeId === option.planTypeId
		);
		if (formattedOption) {
			return formattedOption.deliveryOptions.push({
				id: option.deliveryOptionId,
				name: option.deliveryOption,
			});
		}
		return formattedPlanOptions.push({
			planTypeId: option.planTypeId,
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

async function setUserPlan({ userId, planTypeId, deliveryOptionId }) {
	const now = new Date();

	const createdPlan = await planRepository.insertUserPlan({
		userId,
		planTypeId,
		deliveryOptionId,
		subscriptionDate: now,
	});

	if (!createdPlan) {
		return null;
	}

	return createdPlan.rows[0].id;
}

async function subscribeUser({
	userId,
	planTypeId,
	deliveryOptionId,
	productsList,
	address,
}) {
	const plan = await isRegisteredUser({ userId });

	if (plan === null) {
		return null;
	}

	if (plan) {
		return false;
	}

	const createdPlanId = setUserPlan({ userId, planTypeId, deliveryOptionId });

	if (!createdPlanId) {
		return null;
	}

	const createdAddressId = await addressService.insertAddress({
		userId,
		address,
	});

	if (!createdAddressId) {
		planRepository.deleteUserPlan({ planId: createdPlanId });
		return null;
	}

	const addedProducts = await productService.insertProducts({
		userId,
		productsList,
	});

	if (!addedProducts) {
		await planRepository.deleteUserPlan({ planId: createdPlanId });
		await addressService.deleteAddress({ addressId: createdAddressId });
		return null;
	}

	return true;
}

export default {
	isSubscriber,
	setUserPlan,
	getPlanOptions,
	getUserPlanInformations,
	subscribeUser,
};
