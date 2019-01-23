import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { next } from 'jest-express/lib/next';
import * as mongoose from 'mongoose';
import { validateMongoModelId } from '../../../middleware/validateMongoModelId';

describe('Middlevalidate Unit: ValidateMongoId', () => {
	let request: any;
	let response: any;
	let nextFunction: any;

	beforeEach(() => {
		request = new Request();
		response = new Response();
		nextFunction = next.mockReset();
	});

	afterEach(() => {
		request.resetMocked();
	});

	describe('ValidateMongoId', () => {
		it('params should be empty by default', () => {
			expect(request.params).toEqual({});
		});

		it('should return success if id is valide', () => {
			const params = {id: mongoose.Types.ObjectId().toHexString};

			request.setParams(params);

			validateMongoModelId(request, response, nextFunction);
			expect(request.params).toHaveProperty('id', params.id);
			expect(request).toBeDefined();
			expect(nextFunction).toHaveBeenCalled();
		});

		it('should return 404 if id not valid', () => {
			const params = {};

			request.setParams(params);

			validateMongoModelId(request, response, nextFunction);
			expect(request).toBeDefined();			
			expect(response.status).toHaveBeenCalledWith(404);
		});
	});
});
