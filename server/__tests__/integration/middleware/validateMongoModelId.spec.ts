import * as request from 'supertest';
import { Project } from '../../../models/Project.model';
import server from '../../../server';

describe('Middlevalidate IntegrationTest: validateMongoModelId', () => {
	let app;

	beforeEach(async() => {
		app = server.app;
		await Project.remove({});
	});

	afterEach(async () => {
		await Project.remove({});
	})

	describe('validateMongoModelId', () => {
		
		it('should return 404 if id is not MongoId', async () => {
			const res = await request(app).get('/api/projects/1');
			expect(res.status).toBe(404);
		});

		it('should call next if the ID is valid', async() => {
			const project = new Project({name: 'Project with valid id'});
			await project.save();
			const res = await request(app).get(`/api/projects/${project._id}`);
			expect(res.status).toBe(200);
		});
	});
});
