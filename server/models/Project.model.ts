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

	static async deleteProject(projectName: string): Promise<any> {
		try {
			return await Project.update({ name: projectName }, { deleted: true });
		} catch (error) {
			console.error('Failed to delete project', error);
		}
	}

	static async updateProjectByName(
		projectName: string,
		update: object
	): Promise<IProjectModel> {
		try {
			return await Project.findOneAndUpdate({name: projectName}, update);
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
