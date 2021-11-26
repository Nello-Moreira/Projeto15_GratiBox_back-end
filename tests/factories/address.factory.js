import faker from 'faker';

faker.locale = 'pt_BR';

function createAddress({ stateId }) {
	return {
		receiverName: faker.name.firstName(),
		zipCode: faker.address.zipCode(),
		streetName: faker.address.streetName(),
		city: faker.address.cityName(),
		stateId,
	};
}

export default { createAddress };
