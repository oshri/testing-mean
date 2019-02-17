import { IWrite, DeleteWriteResultObject } from './interfaces/write.interface';
import { IRead, IQueryParams } from './interfaces/read.interface';

import { Document, Schema, Model, model } from 'mongoose';
export abstract class DbRepository<T> implements IWrite<T>, IRead<T> {
	public readonly model: Model<any>;

	constructor(name: string, schema: Schema) {
		this.model = model(name, schema);
	}

	create(item: T): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.model
				.create(item)
				.then(resoult => resolve(true))
				.catch(error => reject(false));
		});
	}

	update(_id: string, item: T): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.model
				.updateOne({ _id }, { $set: item })
				.exec()
				.then(resoult => resolve(true))
				.catch(erorr => reject(false));
		});
	}

	delete(_id: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.model
				.deleteOne({ _id })
				.exec()
				.then(resoult => resolve(true))
				.catch(error => reject(false));
		});
	}

	findOne(_id: string): Promise<T> {
		return this.model.findOne({ _id }).exec();
	}

	findByItemName(name: string): Promise<T> {
		return this.model
			.findOne()
			.where({ name })
			.exec();
	}

	findAll(queryParams: IQueryParams): Promise<T[]> {
		return this.model
			.find()
			.limit(queryParams.limit)
			.exec();
	}
}
