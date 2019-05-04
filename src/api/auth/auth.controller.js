import USERS from './auth.store';
import { ApiResponse, signToken } from '../../utils/helpers';

const appUsers = USERS;

export default class AuthController {

	static async login(req, res, next) {
		const payload = req.body;
		let user = null;
		for (let u of appUsers) {
			if (String(u.email) === payload.email) {
				user = u;
				break;
			}
		}
		if (user) {
			const token = await signToken(user);
			appUsers.push(user);
			res.status(201).json(ApiResponse({
				meta: {token},
				message: 'successful',
				code: 200,
				data: user
			}));
		} else {
			return next({
				message: 'user with credential not found',
				code: 401
			})
		}
	}

	static async register(req, res, next) {
		const payload = req.body;
		// Todo validate user payload
		let user = null;
		for (let u of appUsers) {
			if (String(u.email) === payload.email) {
				user = u;
				break;
			}
		}
		if (!user) {
			let newId = 1;
			if (appUsers.length > 0) {
				newId = Number(appUsers[appUsers.length - 1]._id) + 1;
			}
			user = Object.assign({}, payload, {_id: newId});
			console.log('user : ', user);
			const token = await signToken(user);
			appUsers.push(user);
			res.status(201).json(ApiResponse({
				meta: {token},
				message: 'successful',
				code: 200,
				data: user
			}));
		} else {
			return next({
				message: 'user already exist',
				code: 409
			})
		}
	}
}
