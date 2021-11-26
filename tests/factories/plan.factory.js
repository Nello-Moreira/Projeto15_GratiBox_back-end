function createPlanType() {
	return {
		id: null,
		type: 'TestPlan',
	};
}

function createDeliveryOption(planTypeId) {
	return {
		id: null,
		planTypeId,
		name: 'TestOption',
	};
}

export default { createPlanType, createDeliveryOption };
