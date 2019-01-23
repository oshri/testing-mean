import * as request from 'supertest';
import server from '../../../server';

describe('Middlevalidate IntegrationTest: validateProjectBody', () => {
	let app;

	beforeEach(async() => {
		app = server.app;
	});

	describe('validateProjectBody', () => {
		
		it('should return 400 if body is not valid', async () => {
			const res = await request(app).post('/api/projects').send({});
			expect(res.status).toBe(400);
		});

		it('should return error message if body not have name *required', async () => {
			const res = await request(app).post('/api/projects').send({});
			const error = {"error": [{"context": {"key": "name", "label": "name"}, "message": "\"name\" is required", "path": ["name"], "type": "any.required"}], "message": "Create Project"};
			expect(res.body).toEqual(error);
		});

		it('should call next if the body is valid & create project', async() => {
			const res = await request(app).post(`/api/projects`).send({name: 'Valid project'});
			expect(res.status).toBe(200);
		});
	});
});
