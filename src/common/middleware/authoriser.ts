import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token-utils';
import AdminUserService from '../../admin/user/admin-user-service';
import { jwtDecode } from 'jwt-decode';

const userService = new AdminUserService();

export const authorizer = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			return res.status(401).json({ message: 'No Header. Please login again.' });
		}

		const [_, token] = authorization.split(' ');
		if (!token) {
			return res.status(401).json({ message: 'No token. Please login again.' });
		}

		if (isJwtExpired(token)) {
			return res.status(401).json({ message: 'Token expired. Please login again.' });
		}

		const payload: any = await verifyToken(token);

		if (!payload) {
			return res.status(401).json({ message: 'Invalid token. Please login again.' });
		}

		const user = await userService.getById(payload._id);
		if (!user) {
			return res.status(401).json({ message: 'No Token in cache or not matching. Please login' });
		}

		if (!req.body) req.body = {};
		req.body.loggedInUser = user;

		next();
	} catch (error) {
		console.log('Error in authorizer', error);
		next(error); // Pass the error to the next middleware ( Default error handler )
	}
};

export const roleChecker = (roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { loggedInUser } = req.body;
		if (!loggedInUser || !roles.includes(loggedInUser.role) || !loggedInUser.is_active) {
			return res.status(403).json({ message: "Access denied, You don't have the permission" });
		}
		next();
	};
};

function isJwtExpired(token: string): boolean {
	const decoded = jwtDecode(token);
	const now = Math.floor(Date.now() / 1000);
	return decoded.exp! < now;
}
