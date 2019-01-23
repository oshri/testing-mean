import { Request, Response, NextFunction } from 'express';

/**
 * 
 * @param handler Express async route function
 */
export const asyncMiddleware = (handler: Function) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await handler(req, res, next);
		} catch (ex) {
			next(ex);
		}
	}
};