import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { environment } from '../config/environment';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ error: 'No token provided' });
	}

	const parts = authHeader.split(' ');

	if (parts.length !== 2) {
		return res.status(401).json({ error: 'Token error' });
	}

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).json({ error: 'Token malformatted' });
	}

	jwt.verify(token, environment.jwtSecret, (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: 'Token invalid' });
		}

		req.userId = decoded.id;
		return next();
	});
};
