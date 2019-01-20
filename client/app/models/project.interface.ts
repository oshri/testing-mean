export interface IProject {
	readonly _id: string;
	readonly updatedAt: string;
	readonly createdAt: string;
	name: string;
	description?: string;
	deleted?: boolean;
}