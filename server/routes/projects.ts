import { NextFunction, Request, Response, Router } from 'express';
import { IProject } from '../../models';
import { ProjectSchema } from '../models/Project.model';
import logErrorAndNext from '../utils/logErrorAndNext';
import { asyncMiddleware , validateMongoModelId, validateProjectBody}  from '../middleware';
import { DbRepository } from '../repositories/dbRepository';
export class ProjectsRoute extends DbRepository<any>{

	public static createRoutes(router: Router) {
		router.get(
			'/projects',
			asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
				const projects = await new ProjectsRoute().getProjects();
				res.status(200).json(projects);
			})
		);

		router.get(
			'/projects/:id',
			validateMongoModelId,
			asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
				const { id } = req.params;
				const project = await new ProjectsRoute().getProject(id);
				res.status(200).json(project);
			})
		);

		router.get(
			'/projects/:name/exist',
			asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
				const { name } = req.params;
				const existing = await new ProjectsRoute().projectExist(name);

				if (existing) {
					res.status(200).json({ exist: true });
				}
				res.status(200).json({ exist: false });
			})
		);

		router.post(
			'/projects',
			validateProjectBody,
			asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
				const project = await new ProjectsRoute().createProject(req.body);
				res.status(200).json(project);
			})
		);

		router.put(
			'/projects/:id',
			validateMongoModelId,
			asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
				const update = await new ProjectsRoute().updateProject(req.params.id, req.body);

				res.status(200).send({
					message: `ProjectName: ${req.body.name}, was successfully updated`
				});
			})
		);

		router.delete(
			'/projects/:id',
			validateMongoModelId,
			asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
				const { id } = req.params;
				const deleted = await new ProjectsRoute().deleteProject(id);
				res.status(200).send({
					message: `Project was successfully deleted`
				});
			})
		);
	}

	constructor() {
		super('Project', ProjectSchema);
	}

	public getProjects(): Promise<IProject[]> {
		return this.findAll({limit: 10});
	}

	public getProject(id: string): Promise<IProject> {
		return this.findOne(id);
	}

	public projectExist(name: string): Promise<IProject> {
		return this.findByItemName(name);
	}

	public createProject(project: IProject): Promise<boolean> {
		return this.create(project);
	}

	public updateProject(id: string, update: IProject): Promise<boolean> {
		return this.update(id, update);
	}

	public deleteProject(id: string): Promise<boolean> {
		return this.delete(id);
	}
	
}
