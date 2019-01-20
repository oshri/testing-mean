import { Request, Response, NextFunction } from 'express';
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
			logErrorAndNext(`Route Error`, ex, {}, next, res, 400);
		}
	}
};
