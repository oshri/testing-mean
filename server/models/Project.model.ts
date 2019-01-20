import { Document, Schema, Model, model } from 'mongoose';
import { IProject } from '../../models';

export const ProjectKeys = {
	name: { type: String, maxlength: 32, required: true, unique: true},
	description: { type: String, required: false },
	deleted: { type: Boolean, default: false }
};

export class ProjectClass {

	static async findProjectByName(projectName: String): Promise<Object> {
		try{
			return await Project.findOne().where({name: projectName}).exec();
		} catch (error) {
			return error;
		}

	}
	

	static async createProject(project: IProject): Promise<Object> {
		try{
			const proj = new Project(project);
			return await proj.save();
		} catch (error) {
			return error;
		}

	}


	static async getProjects(): Promise<Object[]> {
		try {
			return await Project.find({ deleted: false });
		} catch (error) {
			console.error('Failed to get projects', error);
			return null;
		}
	}

	static async deleteProject(projectId: string): Promise<any> {
		try {
			return await Project.deleteOne({ _id: projectId });
		} catch (error) {
			console.error('Failed to delete project', error);
		}
	}

	static async updateProjectById(
		projectId: string,
		update: IProject
	): Promise<IProjectModel> {
		try {
			
			const uniqName = await ProjectClass.findProjectByName(update.name);
			if (uniqName) { return };

			const project = await Project.findById(projectId);
			if (!project) { return };
			project.set(update);

			return await project.save();
		} catch (error) {
			console.error('Failed to update project', error);
		}
	}
}

export interface IProjectModel extends IProject, Document {}

export const ProjectSchema: Schema = new Schema(ProjectKeys, {
	timestamps: true
});
ProjectSchema.loadClass(ProjectClass);

export const Project: Model<IProjectModel> = model<IProjectModel>(
	'Project',
	ProjectSchema
);
