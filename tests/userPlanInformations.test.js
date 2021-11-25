import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import planRepository from '../src/repositories/planRepository.js';
import userRepository from '../src/repositories/userRepository.js';

import userFactory from './factories/user.factory.js';

describe('Tests for get /states', () => {
	const route = '/plan-informations';
	const user = userFactory.createNewUser();

	beforeAll(async () => {
		await userRepository.deleteAllUsers();
		user.id = await userRepository.insertUser(user);
		await userRepository.insertSession({ ...user, userId: user.id });
	});

	afterAll(async () => {
		await userRepository.deleteAllUsers();
		endConnection();
	});

	it('should return 200 and an array os states', async () => {
		const response = await supertest(server).get(route);
		expect(response.status).toBe(200);
	});

	it('should return 204 when there are no states', async () => {
		const response = await supertest(server).get(route);
		expect(response.status).toBe(204);
	});
});
