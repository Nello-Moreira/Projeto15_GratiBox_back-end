import supertest from 'supertest';
import server from '../src/server.js';
import { endConnection } from '../src/repositories/connection.js';
import testRepository from './testRepository/testRepository.js';

import productFactory from './factories/product.factory.js';

describe('Tests for get /products', () => {
	const route = '/products';
	const testProduct = productFactory.createProduct();

	beforeAll(async () => {
		await testRepository.deleteAllProducts();
		const queryResult = await testRepository.insertProduct({
			name: testProduct.name,
		});
		testProduct.id = queryResult.rows[0].id;
	});

	afterEach(async () => {
		await testRepository.deleteAllProducts();
	});

	afterAll(async () => {
		endConnection();
	});

	it('should return 200 when there are products', async () => {
		const response = await supertest(server).get(route);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0]).toEqual({
			id: testProduct.id,
			name: testProduct.name,
		});
	});

	it('should return 204 when there are no products', async () => {
		const response = await supertest(server).get(route);
		expect(response.status).toBe(204);
	});
});
