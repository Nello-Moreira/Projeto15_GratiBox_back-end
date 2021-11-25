import faker from 'faker';
import { v4 as uuid } from 'uuid';

function createNewUser(existingUser = false) {
	let name = faker.name.firstName();

	if (existingUser) {
		while (name === existingUser.name) {
			name = faker.name.firstName();
		}
	}

	return {
		id: null,
		name,
		email: faker.internet.email(name),
		password: faker.internet.password(5),
		token: uuid(),
	};
}

function createWrongPassword() {
	return faker.internet.password(10);
}

export default {
	createNewUser,
	createWrongPassword,
};
