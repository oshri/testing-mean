import * as request from 'supertest';
import { Project } from '../../../models/Project.model';
import * as mongoose from 'mongoose';
import server from '../../../server';

describe('Projects: Router /api/projects', () => {
	let app;
	const baseUrl: string = '/api/projects';

	beforeEach(async () => {
		app = server.app;
		await Project.remove({});
	});

	afterEach(async () => {
		await Project.remove({});
	});

	describe('GET /', () => {
		it('should return all projects', async () => {
			await Project.collection.insertMany([{ name: 'Project 1' }, { name: 'Project 2' }]);

			const res = await request(app).get(`${baseUrl}`);
			expect(res.status).toEqual(200);
			expect(res.body.length).toBe(2);
			expect(res.body.some(p => p.name === 'Project 1')).toBeTruthy();
			expect(res.body.some(p => p.name === 'Project 2')).toBeTruthy();
		});
	});

	describe('GET /:name', () => {
		it('should return project if valid id is passsed', async () => {
			const project = new Project({ name: 'Project 1' });
			await project.save();

			const res = await request(app).get(`${baseUrl}/${project._id}`);
			expect(res.status).toEqual(200);
		});

		it('should return 404 if invalid id is pass', async () => {
			const res = await request(app).get(`${baseUrl}/1`);
			expect(res.status).toEqual(404);
		});

		it('should return 404 if no project with the givan id exists', async () => {
			const res = await request(app).get(`${baseUrl}/${mongoose.Types.ObjectId().toHexString}`);
			expect(res.status).toEqual(404);
		});
	});

	describe('GET /:name/exist', () => {
		it('should return ture if project name is exist', async () => {
			const project = new Project({ name: 'Project 1' });
			await project.save();

			const responseMessage = { exist: true };
			const res = await request(app).get(`${baseUrl}/${project.name}/exist`);
			expect(res.body).toEqual(responseMessage);
		});

		it('should return false if project name is not exist', async () => {
			const project = new Project({ name: 'Project 1' });
			await project.save();

			const responseMessage = { exist: false };
			const res = await request(app).get(`${baseUrl}/Project 2/exist`);
			expect(res.body).toEqual(responseMessage);
		});
	});

	describe('POST /', () => {
		it('should return 400 if the require fields not exist', async () => {
			const res = await request(app)
				.post(`${baseUrl}`)
				.send({});
			expect(res.status).toBe(400);
		});

		it('should return 400 if the project name is more then 50 characters', async () => {
			const name = new Array(52).join('a');
			const res = await request(app)
				.post(`${baseUrl}`)
				.send({ name });
			expect(res.status).toBe(400);
		});

		it('should create new project if it valid', async () => {
			const res = await request(app)
				.post(`${baseUrl}`)
				.send({ name: 'Project 1' });
			const project = await Project.find({ name: 'Project 1' });
			expect(project).not.toBeNull();
			expect(project).toBeTruthy();
			expect(res.status).toBe(200);
		});
	});

	describe('PUT /', () => {
		it('should return 404 if project not exist', async () => {
			const res = await request(app)
				.put(`${baseUrl}/1`)
				.send({});
			expect(res.status).toBe(404);
		});

		it('should update project', async () => {
			const project = new Project({ name: 'Project 1' });
			await project.save();

			const res = await request(app)
				.put(`${baseUrl}/${project._id}`)
				.send({ name: 'Project 2' });
			expect(res.status).toBe(200);
		});
	});

	describe('DELETE /', () => {
		it('should delete existing project', async () => {
			const project = new Project({ name: 'Project to delete' });
			await project.save();

			const res = await request(app).delete(`${baseUrl}/${project._id}`);
			expect(res.status).toBe(200);
		});
	});
});
