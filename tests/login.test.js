import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import userRepository from '../src/repositories/userRepository.js';

import userFactory from './factories/user.factory.js';

import { hashPassword } from '../src/helpers/passwordEncrypt.js';

describe('Tests for post /login', () => {
	const route = '/login';
	const user = userFactory.createNewUser();
	const otherUser = userFactory.createNewUser(user);
	const wrongPassword = userFactory.createWrongPassword();
	const validBody = { email: user.email, password: user.password };

	beforeAll(async () => {
		await userRepository.deleteAllUsers();
		await userRepository.insertUser({
			name: user.name,
			email: user.email,
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
		expect(response.body).toHaveProperty('username');
		expect(response.body).toHaveProperty('token');
		expect(session.rowCount).toBe(1);
	});

	it('should return 404 for unregistred email', async () => {
		const response = await supertest(server)
			.post(route)
			.send({ email: otherUser.email, password: otherUser.password });

		expect(response.status).toBe(404);
	});

	it('should return 404 for wrong password', async () => {
		const response = await supertest(server)
			.post(route)
			.send({ ...validBody, password: wrongPassword });

		expect(response.status).toBe(404);
	});

	it('should return 400 for invalid email', async () => {
		const response = await supertest(server)
			.post(route)
			.send({ ...validBody, email: null });

		expect(response.status).toBe(400);
	});

	it('should return 400 for invalid password', async () => {
		const response = await supertest(server)
			.post(route)
			.send({ ...validBody, password: null });

		expect(response.status).toBe(400);
	});
});
