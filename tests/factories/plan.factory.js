function createPlanType() {
	return {
		id: null,
		type: 'TestPlan',
	};
}

function createDeliveryOption(planId) {
	return {
		id: null,
		planId,
		name: 'TestOption',
	};
}

export default { createPlanType, createDeliveryOption };
