import faker from 'faker';
import createRandomInteger from '../../src/helpers/randomInteger.js';

function validSignUpBodyFactory() {
	const name = faker.name.firstName();

	return {
		name,
		email: faker.internet.email(name),
		password: faker.internet.password(6),
	};
}

function invalidSignUpBodyFactory() {
	const validBody = validSignUpBodyFactory();
	const randomNumber = faker.datatype.number();

	const invalidBodies = [
		{ ...validBody, name: randomNumber },
		{ ...validBody, email: randomNumber },
		{ ...validBody, password: randomNumber },
	];

	const selectedBodyIndex = createRandomInteger(0, invalidBodies.length - 1);

	return invalidBodies[selectedBodyIndex];
}

export { validSignUpBodyFactory, invalidSignUpBodyFactory };
