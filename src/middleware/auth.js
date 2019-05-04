import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

export const excluded = [
	{route: 'login', method: 'POST'},
	{route: 'register', method: 'POST'},
];

const prefix = '/api/v1/';
export default (req, res, next) => {
	const currentUrlPath = req.originalUrl.split('?')[0];

	const filtered = excluded.filter((item) => {
		const url = `${prefix}${item.route}`;
		return currentUrlPath === url && req.method.toLowerCase() === item.method.toLowerCase();
	});
	if (filtered.length) return next();
	const token = req.body.token || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, 'todoapp', (err, decoded) => {
			if (err) {
				let message = '';
				if (err.name) {
					switch (err.name) {
					case 'TokenExpiredError':
						message = 'You are not logged in!';
						break;
					default:
						message = 'Failed to authenticate token';
						break;
					}
				}
				return next({
					message,
					code: 401
				});
			} else {
				req.userId = decoded.userId;
				next();
			}
		});
	} else {
		return next({
			message: 'No authorization token provided',
			code: 401
		});
	}
};
