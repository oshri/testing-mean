import { NextFunction, Request, Response, Router } from 'express';
import { IProject } from '../../models';
import { ProjectClass, Project, IProjectModel } from '../models/Project.model';
import logErrorAndNext from '../utils/logErrorAndNext';
import * as Joi from 'joi';
import { asyncMiddleware }  from '../utils/middlewares';
export class ProjectsRoute {
	public static createRoutes(router: Router) {
		router.get(
			'/projects',
			asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
				const projects = await ProjectClass.getProjects();
				res.status(200).json(projects);
			})
		);

		router.get(
			'/projects/:name',
			asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
				const { name } = req.params;
				const project = await ProjectClass.findProjectByName(name);
				res.status(200).json(project);
			})
		);

		router.get(
			'/projects/:name/exist',
			asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
				const { name } = req.params;
				const existing = await ProjectClass.findProjectByName(name);

				if (existing) {
					res.status(200).json({ exist: true });
				}
				res.status(200).json({ exist: false });
			})
		);

		router.post(
			'/projects',
			asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
				const project = await new ProjectsRoute().createProject(req, res, next);
				res.status(200).json(project);
			})
		);

		router.put(
			'/projects/:id',
			asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
				const update = await new ProjectsRoute().updateProject(req, res, next);

				res.status(200).send({
					message: `ProjectName: ${req.body.name}, was successfully updated`
				});
			})
		);

		router.delete(
			'/projects/:id',
			asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
				const { id } = req.params;
				const deleted = await ProjectClass.deleteProject(id);
				res.status(200).send({
					message: `Project was successfully deleted`
				});
			})
		);
	}

	public async createProject(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { error } = this.validateBody(req.body);
		if (error) {
			logErrorAndNext(
				'Create Project',
				error.details,
				{},
				next,
				res,
				400
			);
		}

		try {
			const { name } = req.body;
			const existing = await ProjectClass.findProjectByName(name);
			if (existing) {
				logErrorAndNext(
					`project '${name}' already exists`,
					{},
					{},
					next,
					res,
					409
				);
			}

			return await ProjectClass.createProject(req.body);
		} catch (error) {
			return next(error);
		}
	}

	public async updateProject(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { error } = this.validateBody(req.body);
		if (error) {
			logErrorAndNext(
				'Update Project',
				error.details,
				{},
				next,
				res,
				400
			);
		}

		try {
			const { id } = req.params;
			const updated = await ProjectClass.updateProjectById(id, req.body);
			if (!updated) {
				logErrorAndNext(
					`ProjectName: ${req.body.name}, allready exist`,
					{},
					{},
					next,
					res,
					400
				);
			}

			return updated;
		} catch (error) {
			return next(error);
		}
	}

	private validateBody(body: object) {
		const schema = {
			name: Joi.string().min(3).required(),
			description: Joi.string(),
			deleted: Joi.boolean()
		};

		return Joi.validate(body, schema);
	}
}
