import supertest from 'supertest';
import server from '../src/server.js';
import signup from '../src/controllers/signUp.js';

import {
	searchUser,
	insertUser,
	deleteAllUsers,
} from '../src/data/usersTable.js';
import { endConnection } from '../src/data/connection.js';

import {
	validSignUpBodyFactory,
	invalidSignUpBodyFactory,
} from './fakerFactories/signUpBodyFactory.js';

describe('Tests for post /sign-up', () => {
	const validBody = validSignUpBodyFactory();
	const invalidBody = invalidSignUpBodyFactory();

	beforeAll(async () => {
		await deleteAllUsers();
	});

	afterEach(async () => {
		await deleteAllUsers();
		await insertUser(validBody);
	});

	afterAll(async () => {
		deleteAllUsers();
		endConnection();
	});

	it('should return 200 for valid body', async () => {
		const response = await supertest(server).post(signup.route).send(validBody);
		const user = await searchUser(validBody.email);
		expect(response.status).toBe(201);
		expect(user.rowCount).toBe(1);
	});

	it('should return 409 for invalid body', async () => {
		const response = await supertest(server).post(signup.route).send(validBody);
		expect(response.status).toBe(409);
	});

	it('should return 400 for invalid body', async () => {
		const response = await supertest(server)
			.post(signup.route)
			.send(invalidBody);
		expect(response.status).toBe(400);
	});
});
