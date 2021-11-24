import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import planRepository from '../src/repositories/planRepository.js';

describe('Tests for get /products', () => {
	const route = '/products';
	const testProductName = 'Chás';
	let insertedProductId;

	beforeAll(async () => {
		await planRepository.deleteAllProducts();
		const queryResult = await planRepository.insertProduct(testProductName);
		insertedProductId = queryResult.rows[0].id;
	});

	afterEach(async () => {
		await planRepository.deleteAllProducts();
	});

	afterAll(async () => {
		endConnection();
	});

	it('should return 200 when there are products', async () => {
		const response = await supertest(server).get(route);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0]).toEqual({
			id: insertedProductId,
			name: testProductName,
		});
	});

	it('should return 204 when there are no products', async () => {
		const response = await supertest(server).get(route);
		expect(response.status).toBe(204);
	});
});
