import jwt from 'jsonwebtoken';

export const ApiResponse = ({meta, code, message, error, data}) => {
	const response = {};
	const responseMeta = {...meta};
	if (error) {
		responseMeta['error'] = error;
	}
	if (message) {
		responseMeta['message'] = message;
	}
	responseMeta['code'] = code;
	response['meta'] = responseMeta;
	if (data) {
		response['data'] = data;
	}
	return response;
};

/**
 * @param {Object} obj The object properties
 * @return {Promise<Object>}
 */
export const signToken = async (obj) => {
	return jwt.sign(obj, 'todoapp',
		{expiresIn: 24000}); // expires in 24 hours
};