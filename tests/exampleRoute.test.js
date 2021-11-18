import supertest from 'supertest';
import server from '../src/server.js';
import exampleRoute from '../src/controllers/exampleRoute.js';

describe('Tests for get /example-route', () => {
	it('should return something', async () => {
		const response = await supertest(server).get(exampleRoute.route);
		expect(response.status).toBe(501);
	});
});
