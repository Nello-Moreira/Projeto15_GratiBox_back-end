import supertest from 'supertest';
import server from '../src/server.js';
import products from '../src/controllers/products.js';
import { endConnection } from '../src/repositories/connection.js';

import {
	insertProducts,
	deleteAllProducts,
} from '../src/repositories/productsTable.js';

describe('Tests for get /products', () => {
	beforeAll(async () => {
		await deleteAllProducts();
		await insertProducts();
	});

	afterEach(async () => {
		await deleteAllProducts();
	});

	afterAll(async () => {
		await deleteAllProducts();
		endConnection();
	});

	it('should return 200 when there are products', async () => {
		const response = await supertest(server).get(products.route);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(3);
	});

	it('should return 204 when there are no products', async () => {
		const response = await supertest(server).get(products.route);
		expect(response.status).toBe(204);
	});
});
