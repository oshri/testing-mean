import * as request from 'supertest';
import server from '../../server';

describe('Api endpoint', () => {
	let app;

	beforeEach(() => {
		app = server.app;
	});

	describe('Projects route', () => {

		it('GET api/projects', async () => {
			const res = await request(app).get('/api/projects');
			expect(res.status).toEqual(200);
		});
	})

});
