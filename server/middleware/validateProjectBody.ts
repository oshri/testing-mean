import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import logErrorAndNext from '../utils/logErrorAndNext';

/**
 * 
 * @param req POST / UPDATE Project
 * @param res Body is valid Or Body in not valid
 * @param next Call next if Body is valid
 */

export const validateProjectBody = (req: Request, res: Response, next: NextFunction) => {
	
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		description: Joi.string()
	};

	const {error} = Joi.validate(req.body, schema);
	
	if (error) {
		logErrorAndNext('Create Project', error.details, {}, next, res, 400);
	}

	next();

};
