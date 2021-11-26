import faker from 'faker';

faker.locale = 'pt_BR';

function createProduct() {
	return {
		id: null,
		name: faker.commerce.productName(),
	};
}

export default { createProduct };
