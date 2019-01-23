import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { next } from 'jest-express/lib/next';
import * as mongoose from 'mongoose';
import { validateProjectBody } from '../../../middleware/validateProjectBody';

describe('Middlevalidate Unit: validateProjectBody', () => {
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

	describe('validateProjectBody', () => {
		
		it('should return success if body contain project *required fields', () => {
			const project = {name: 'Good project name'};

			request.setBody(project);

			validateProjectBody(request, response, nextFunction);
			expect(request).toBeDefined();
			expect(nextFunction).toHaveBeenCalled();
		});

		it('should return 400 if body is not valid project', () => {
			validateProjectBody(request, response, nextFunction);
			expect(request).toBeDefined();			
			expect(response.status).toHaveBeenCalledWith(400);
		});
	});
});
