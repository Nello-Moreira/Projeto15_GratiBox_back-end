import faker from 'faker';

faker.locale = 'pt_BR';

export default function createProduct() {
	return {
		id: null,
		name: faker.commerce.productName(),
	};
}
