import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import planRepository from '../src/repositories/planRepository.js';

import planFactory from './factories/plan.factory.js';

describe('Tests for get /plan-options', () => {
	const route = '/plan-options';
	const testPlan = planFactory.createPlanType();
	let testDeliveryOption;

	beforeAll(async () => {
		await planRepository.deleteAllPlanOptions();
		const queryResult = await planRepository.insertPlanType(testPlan.type);
		testPlan.id = queryResult.rows[0].id;

		testDeliveryOption = planFactory.createDeliveryOption(testPlan.id);
		const optionId = await planRepository.insertDeliveryOptions({
			planId: testDeliveryOption.planId,
			optionName: testDeliveryOption.name,
		});
		testDeliveryOption.id = optionId.rows[0].id;
	});

	afterEach(async () => {
		await planRepository.deleteAllPlanOptions();
	});

	afterAll(async () => {
		endConnection();
	});

	it('should return status 200 when there are plan options', async () => {
		const response = await supertest(server).get(route);

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0]).toEqual({
			planId: testPlan.id,
			planType: testPlan.type,
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
