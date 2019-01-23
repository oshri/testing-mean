import { IWrite } from './interfaces/write.interface';
import { IRead, IQueryParams } from './interfaces/read.interface';

import { Document, Schema, Model, model } from 'mongoose';


export abstract class DbRepository<T> implements IWrite<T>, IRead<T> {

	public readonly model: Model<any>;

	constructor(name: string, schema: Schema) {
		this.model = model(name, schema);
	}

    create(item: T): Promise<boolean> {
		const resoult = new this.model(item);
		return resoult.save();
    }
	
	async update(_id: string, item: T): Promise<boolean> {
        const resoult = await this.model.findOne({_id});
		if (!resoult) { return };
		resoult.set(item);
		return await resoult.save();
    }
	
	delete(_id: string): Promise<boolean> {
        return this.model.deleteOne({_id}).exec();
    }
	
	findOne(_id: string): Promise<T> {
		return this.model.findOne({ _id }).exec();
	}
	
	findByItemName(name: string): Promise<T> {
		return this.model.findOne().where({name}).exec();
	}

	findAll(queryParams: IQueryParams): Promise<T[]> {
		return this.model
					.find()
					.limit(queryParams.limit)
					.exec();
	}
}
