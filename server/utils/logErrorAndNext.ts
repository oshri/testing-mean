import { NextFunction, Request, Response, Router } from 'express';
import { CustomLogger } from './logger';

export default function logErrorAndNext(message: string, error: any, dynamic: any, next: NextFunction, res: Response, code: number) {
	CustomLogger.logger.error(message, error, dynamic);
	next(res.status(code).send({
		error, message
	}));
};
