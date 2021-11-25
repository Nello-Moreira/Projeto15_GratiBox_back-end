import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import userRepository from '../src/repositories/userRepository.js';

import userFactory from './factories/user.factory.js';

describe('Tests for post /sign-up', () => {
	const route = '/sign-up';
	const user = userFactory.createNewUser();
	const validBody = {
		name: user.name,
		email: user.email,
		password: user.password,
	};

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
		const insertedUser = await userRepository.searchUserByParam({
			param: 'email',
			value: user.email,
		});

		expect(response.status).toBe(201);
		expect(insertedUser.rowCount).toBe(1);
	});

	it('should return 409 when provided email is already in use', async () => {
		const response = await supertest(server).post(route).send(validBody);

		expect(response.status).toBe(409);
	});

	it('should return 400 for invalid name', async () => {
		const response = await supertest(server)
			.post(route)
			.send({
				...validBody,
				name: null,
			});

		expect(response.status).toBe(400);
	});

	it('should return 400 for invalid email', async () => {
		const response = await supertest(server)
			.post(route)
			.send({
				...validBody,
				email: null,
			});

		expect(response.status).toBe(400);
	});

	it('should return 400 for invalid password', async () => {
		const response = await supertest(server)
			.post(route)
			.send({
				...validBody,
				password: null,
			});

		expect(response.status).toBe(400);
	});
});
