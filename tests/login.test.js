import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import userRepository from '../src/repositories/userRepository.js';

import {
	invalidLoginBodyFactory,
	wrongPasswordLoginBodyFactory,
	differentEmailLoginBodyFactory,
} from './fakerFactories/loginBodyFactory.js';
import { validSignUpBodyFactory } from './fakerFactories/signUpBodyFactory.js';

import { hashPassword } from '../src/helpers/passwordEncrypt.js';

describe('Tests for post /login', () => {
	const route = '/login';
	const user = validSignUpBodyFactory();
	const validBody = { email: user.email, password: user.password };
	const invalidBody = invalidLoginBodyFactory();
	const wrongPasswordBody = wrongPasswordLoginBodyFactory(validBody);
	const wrongEmailBody = differentEmailLoginBodyFactory(validBody);

	beforeAll(async () => {
		await userRepository.deleteAllUsers();
		await userRepository.insertUser({
			...user,
			password: hashPassword(user.password),
		});
	});

	afterEach(async () => {
		await userRepository.deleteAllSessions();
	});

	afterAll(async () => {
		await userRepository.deleteAllUsers();
		endConnection();
	});

	it('should return 200 for valid body', async () => {
		const response = await supertest(server).post(route).send(validBody);
		const session = await userRepository.searchSession(response.body.token);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('token');
		expect(session.rowCount).toBe(1);
	});

	it('should return 404 for unregistred email', async () => {
		const response = await supertest(server).post(route).send(wrongEmailBody);
		expect(response.status).toBe(404);
	});

	it('should return 404 for wrong password', async () => {
		const response = await supertest(server)
			.post(route)
			.send(wrongPasswordBody);
		expect(response.status).toBe(404);
	});

	it('should return 400 for invalid body', async () => {
		const response = await supertest(server).post(route).send(invalidBody);
		expect(response.status).toBe(400);
	});
});
