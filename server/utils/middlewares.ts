import { Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';
import { CustomLogger } from './logger';
import logErrorAndNext from './logErrorAndNext';

/**
 * 
 * @param handler Express async route function
 */
export const asyncMiddleware = (handler: Function) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await handler(req, res, next);
		} catch (ex) {
			// logErrorAndNext(`Route Error`, ex, {}, next, res, 404);
			next(ex);
		}
	}
};

/**
 * 
 * @param req Query mongo by params.id
 * @param res Not valid id
 * @param next pass validate id
 */
export const validateMongoModelId = (req: Request, res: Response, next: NextFunction) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		logErrorAndNext(`Invalid ID.`, {}, {}, next, res, 404);
	}

	next();
};
