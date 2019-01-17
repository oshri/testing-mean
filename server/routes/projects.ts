import { NextFunction, Request, Response, Router } from 'express';
import { IProject } from '../../models';
import { ProjectClass, Project, IProjectModel } from '../models/Project.model';
import logErrorAndNext from '../utils/logErrorAndNext';

export class ProjectsRoute {
	public static createRoutes(router: Router) {
		router.get(
			'/projects',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const projects = await ProjectClass.getProjects();
					res.status(200).json(projects);
				} catch (error) {
					logErrorAndNext('', {}, {}, next, res, 400);
				}
			}
		);

		router.get(
			'/projects/:name',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const { name } = req.params;
					const project = await ProjectClass.findProjectByName(name);
					res.status(200).json(project);
				} catch (error) {
					logErrorAndNext('', {}, {}, next, res, 400);
				}
			}
		);

		router.get(
			'/projects/:name/exist',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const { name } = req.params;
					const existing = await ProjectClass.findProjectByName(name);

					if (existing) {
						res.status(200).json({exist: true});
					}
						res.status(200).json({exist: false});
				} catch (error) {
					logErrorAndNext('', {}, {}, next, res, 400);
				}
			}
		);

		router.post(
			'/projects',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					if (!req.body.name) {
						logErrorAndNext('Missing data', {}, {}, next, res, 400);
					} else {
						const project = await new ProjectsRoute().createProject(
							req,
							res,
							next
						);
						res.status(200).json(project);
					}
				} catch (error) {
					logErrorAndNext('', {}, {}, next, res, 400);
				}
			}
		);

		router.put(
			'/projects/:name',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const { name } = req.params;
					const { update } = req.body;
					await ProjectClass.updateProjectByName(name, update);
					res
						.status(200)
						.send({
							message: `ProjectName: ${name}, was successfully updated`
						});
				} catch (error) {
					logErrorAndNext('', {}, {}, next, res, 400);
				}
			}
		);
	}

	public async createProject(
		req: Request,
		res: Response,
		next: NextFunction
	) {
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
}
