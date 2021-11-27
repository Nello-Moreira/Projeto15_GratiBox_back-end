import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import testRepository from './testRepository/testRepository.js';

import planFactory from './factories/plan.factory.js';

describe('Tests for get /plan-options', () => {
	const route = '/plan-options';
	const testPlanType = planFactory.createPlanType();
	let testDeliveryOption;

	beforeAll(async () => {
		await testRepository.deleteAllPlanOptions();
		const queryResult = await testRepository.insertPlanType({
			type: testPlanType.type,
		});
		testPlanType.id = queryResult.rows[0].id;

		testDeliveryOption = planFactory.createDeliveryOption(testPlanType);
		const optionId = await testRepository.insertDeliveryOptions({
			planTypeId: testDeliveryOption.planTypeId,
			optionName: testDeliveryOption.name,
		});
		testDeliveryOption.id = optionId.rows[0].id;
	});

	afterEach(async () => {
		await testRepository.deleteAllPlanOptions();
	});

	afterAll(async () => {
		endConnection();
	});

	it('should return status 200 when there are plan options', async () => {
		const response = await supertest(server).get(route);

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0]).toEqual({
			planTypeId: testPlanType.id,
			planType: testPlanType.type,
			deliveryOptions: [
				{
					id: testDeliveryOption.id,
					name: testDeliveryOption.name,
				},
			],
		});
	});

	it('should return status 204 when there are no plan options', async () => {
		const response = await supertest(server).get(route);

		expect(response.status).toBe(204);
	});
});
