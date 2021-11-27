import faker from 'faker';
import createRandomInteger from '../../src/helpers/randomInteger.js';

faker.locale = 'pt_BR';

function createPlanType() {
	const planTypes = ['semanal', 'mensal'];

	return {
		id: null,
		type: planTypes[createRandomInteger(0, 1)],
	};
}

function createDeliveryOption(planType) {
	const dayOptions = ['segunda-feira', 'quarta-feira', 'sexta-feira'];
	let name;

	if (planType.type === 'semanal') {
		name = dayOptions[createRandomInteger(0, 2)];
	}

	if (planType.type === 'mensal') {
		name = createRandomInteger(1, 20);
	}

	return {
		id: null,
		planTypeId: planType.id,
		name,
	};
}

export default { createPlanType, createDeliveryOption };
