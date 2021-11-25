import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import testRepository from './testRepository/testRepository.js';

import userFactory from './factories/user.factory.js';

describe('Tests for get /states', () => {
	const route = '/plan-informations';
	const user = userFactory.createNewUser();

	beforeAll(async () => {
		await testRepository.deleteAllUsers();
		user.id = (await testRepository.insertUser(user)).rows[0].id;
		await testRepository.insertSession({ ...user, userId: user.id });
	});

	afterAll(async () => {
		await testRepository.deleteAllUsers();
		endConnection();
	});
});
