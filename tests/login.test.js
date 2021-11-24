/* import supertest from 'supertest';
import server from '../src/server.js';
import login from '../src/controllers/login.js';

import {
	searchSession,
	deleteAllSessions,
} from '../src/repositories/sessionsTable.js';
import { insertUser, deleteAllUsers } from '../src/repositories/usersTable.js';
import { endConnection } from '../src/repositories/connection.js';

import {
	invalidLoginBodyFactory,
	wrongPasswordLoginBodyFactory,
	differentEmailLoginBodyFactory,
} from './fakerFactories/loginBodyFactory.js';
import { validSignUpBodyFactory } from './fakerFactories/signUpBodyFactory.js';

import { hashPassword } from '../src/helpers/passwordEncrypt.js';

describe('Tests for post /login', () => {
	const user = validSignUpBodyFactory();
	const validBody = { email: user.email, password: user.password };
	const invalidBody = invalidLoginBodyFactory();
	const wrongPasswordBody = wrongPasswordLoginBodyFactory(validBody);
	const wrongEmailBody = differentEmailLoginBodyFactory(validBody);

	beforeAll(async () => {
		await deleteAllSessions();
		await deleteAllUsers();
		await insertUser({ ...user, password: hashPassword(user.password) });
	});

	afterEach(async () => {
		await deleteAllSessions();
	});

	afterAll(async () => {
		await deleteAllSessions();
		await deleteAllUsers();
		endConnection();
	});

	it('should return 200 for valid body', async () => {
		const response = await supertest(server).post(login.route).send(validBody);
		const session = await searchSession(response.body.token);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('id');
		expect(response.body).toHaveProperty('name');
		expect(response.body).toHaveProperty('token');
		expect(response.body).toHaveProperty('planType');
		expect(session.rowCount).toBe(1);
	});

	it('should return 404 for unregistred email', async () => {
		const response = await supertest(server)
			.post(login.route)
			.send(wrongEmailBody);
		expect(response.status).toBe(404);
	});

	it('should return 404 for wrong password', async () => {
		const response = await supertest(server)
			.post(login.route)
			.send(wrongPasswordBody);
		expect(response.status).toBe(404);
	});

	it('should return 400 for invalid body', async () => {
		const response = await supertest(server)
			.post(login.route)
			.send(invalidBody);
		expect(response.status).toBe(400);
	});
});
 */
