import { Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';
import logErrorAndNext from '../utils/logErrorAndNext';
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
