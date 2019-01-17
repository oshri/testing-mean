import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './logger';

export const validateProject = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const project = req.body;
		next();
	} catch (error) {
		res.sendStatus(403);
		return;
	}
};
