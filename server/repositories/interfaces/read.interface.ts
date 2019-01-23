export interface IQueryParams {
	limit: number
}

export interface IRead<T> {
	findAll(queryParams: IQueryParams): Promise<T[]>;
	findOne(id: string): Promise<T>;
	findByItemName(name: string): Promise<T>;
}
