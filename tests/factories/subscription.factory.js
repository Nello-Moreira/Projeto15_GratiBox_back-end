function createSubscriptionBody({
	planTypeId,
	deliveryOptionId,
	productsList,
	address,
}) {
	return {
		planTypeId,
		deliveryOptionId,
		productsList,
		address,
	};
}

export default { createSubscriptionBody };
