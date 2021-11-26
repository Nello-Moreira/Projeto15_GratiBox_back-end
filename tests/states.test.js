import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import testRepository from './testRepository/testRepository.js';

import stateFactory from './factories/state.factory.js';

describe('Tests for get /states', () => {
	const route = '/states';
	const testState = stateFactory.createState();

	beforeAll(async () => {
		await testRepository.deleteAllStates();
		testState.id = (await testRepository.insertState(testState)).rows[0].id;
	});

	afterEach(async () => {
		await testRepository.deleteAllStates();
	});

	afterAll(async () => {
		endConnection();
	});

	it('should return 200 and an array os states', async () => {
		const response = await supertest(server).get(route);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0]).toEqual({
			id: testState.id,
			name: testState.name,
			initials: testState.initials,
		});
	});

	it('should return 204 when there are no states', async () => {
		const response = await supertest(server).get(route);
		expect(response.status).toBe(204);
	});
});
