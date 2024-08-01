import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { environment } from '../config/environment';

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

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

	if (!environment.jwtSecret) {
		return res.status(500).json({ error: 'JWT secret is not configured' });
	}

	jwt.verify(token, environment.jwtSecret as Secret, (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: 'Token invalid' });
		}

		if (decoded && typeof decoded !== 'string') {
			req.userId = decoded.id;
			return next();
		}

		return res.status(401).json({ error: 'Invalid token payload' });
	});
};
