import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import testRepository from './testRepository/testRepository.js';

import userFactory from './factories/user.factory.js';
import stateFactory from './factories/state.factory.js';
import productFactory from './factories/product.factory.js';
import planFactory from './factories/plan.factory.js';
import addressFactory from './factories/address.factory.js';

describe('Tests for get /plan-informations', () => {
	const route = '/plan-informations';

	const user = userFactory.createNewUser();
	const testProduct = productFactory.createProduct();
	const testState = stateFactory.createState();
	const testPlanType = planFactory.createPlanType();
	let testDeliveryOption;
	let address;

	beforeAll(async () => {
		await testRepository.clearDataBase();

		user.id = (await testRepository.insertUser(user)).rows[0].id;

		await testRepository.insertSession({ ...user, userId: user.id });

		testPlanType.id = (
			await testRepository.insertPlanType({
				type: testPlanType.type,
			})
		).rows[0].id;

		testDeliveryOption = planFactory.createDeliveryOption(testPlanType);
		testDeliveryOption.id = (
			await testRepository.insertDeliveryOptions({
				planTypeId: testDeliveryOption.planTypeId,
				optionName: testDeliveryOption.name,
			})
		).rows[0].id;

		testState.id = (await testRepository.insertState(testState)).rows[0].id;

		testProduct.id = (
			await testRepository.insertProduct({
				name: testProduct.name,
			})
		).rows[0].id;

		address = addressFactory.createAddress({ stateId: testState.id });

		await testRepository.subscribeUser({
			userId: user.id,
			planTypeId: testPlanType.id,
			deliveryOptionId: testDeliveryOption.id,
			productsList: [testProduct.id],
			address,
		});
	});

	afterEach(async () => {
		await testRepository.deleteAllUserPlans();
	});

	afterAll(async () => {
		await testRepository.clearDataBase();
		endConnection();
	});

	it('should return 200 when user is subscribed', async () => {
		const response = await supertest(server)
			.get(route)
			.set('Authorization', `Bearer ${user.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('planType');
		expect(response.body).toHaveProperty('subscriptionDate');
		expect(response.body).toHaveProperty('productsList');
		expect(response.body).toHaveProperty('nextDeliveries');
		expect(response.body.productsList.length).toBeGreaterThan(0);
		expect(response.body.nextDeliveries).toHaveLength(3);
	});

	/* it("should return 204 when user isn't subscribed", async () => {
		const response = await supertest(server)
			.get(route)
			.set('Authorization', `Bearer ${user.token}`);
		expect(response.status).toBe(204);
	});

	it('should return 401 when there is no authorization header', async () => {
		const response = await supertest(server).get(route);
		expect(response.status).toBe(401);
	});

	it('should return 401 when an invalid token is provided', async () => {
		const response = await supertest(server)
			.get(route)
			.set('Authorization', 'Bearer anyString');
		expect(response.status).toBe(401);
	}); */
});
