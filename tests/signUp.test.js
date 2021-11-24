import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import userRepository from '../src/repositories/userRepository.js';

import {
	validSignUpBodyFactory,
	invalidSignUpBodyFactory,
} from './fakerFactories/signUpBodyFactory.js';

describe('Tests for post /sign-up', () => {
	const route = '/sign-up';
	const validBody = validSignUpBodyFactory();
	const invalidBody = invalidSignUpBodyFactory();

	beforeAll(async () => {
		await userRepository.deleteAllUsers();
	});

	afterEach(async () => {
		await userRepository.deleteAllUsers();
		await userRepository.insertUser(validBody);
	});

	afterAll(async () => {
		await userRepository.deleteAllUsers();
		endConnection();
	});

	it('should return 201 for valid body', async () => {
		const response = await supertest(server).post(route).send(validBody);
		const user = await userRepository.searchUserByEmail(validBody.email);
		expect(response.status).toBe(201);
		expect(user.rowCount).toBe(1);
	});

	it('should return 409 when provided email is already in use', async () => {
		const response = await supertest(server).post(route).send(validBody);
		expect(response.status).toBe(409);
	});

	it('should return 400 for invalid body', async () => {
		const response = await supertest(server).post(route).send(invalidBody);
		expect(response.status).toBe(400);
	});
});
