export interface IWrite<T> {
	create(item: T): Promise<boolean>;
	update(_id: string, item: T): Promise<boolean>;
	delete(_id: string): Promise<boolean>;
}
