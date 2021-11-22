import faker from 'faker';

function invalidLoginBodyFactory() {
	return {
		email: faker.random.alphaNumeric(10),
		password: faker.internet.password(6),
	};
}

function wrongPasswordLoginBodyFactory(validBody) {
	return {
		...validBody,
		password: faker.random.alphaNumeric(10),
	};
}

function differentEmailLoginBodyFactory(validBody) {
	let email = faker.internet.email();

	while (email === validBody.email) {
		email = faker.internet.email();
	}

	return {
		email,
		password: faker.internet.password(6),
	};
}

export {
	invalidLoginBodyFactory,
	wrongPasswordLoginBodyFactory,
	differentEmailLoginBodyFactory,
};
