import { Document, Schema, Model, model } from 'mongoose';
import { IProject } from '../../models';

export const ProjectKeys = {
	name: { type: String, minlength: 5, maxlength: 50, required: true},
	description: { type: String, required: false }
};

export interface IProjectModel extends IProject, Document {}

export const ProjectSchema: Schema = new Schema(ProjectKeys, {
	timestamps: true
});

export const Project: Model<IProjectModel> = model<IProjectModel>(
	'Project',
	ProjectSchema
);
