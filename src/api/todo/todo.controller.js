import TODOS from './todo.store';
import { ApiResponse } from '../../utils/helpers';

const todos = TODOS;

export default class TodoController {

	static id(req, res, next, id) {
		let todo = null;
		for (let t of todos) {
			if (String(t._id) === id) {
				todo = t;
				break;
			}
		}
		if (todo) {
			req.todo = todo;
			return next();
		}
		return next({
			code: 404,
			message: 'resource not found'
		});
	}

	static create(req, res, next) {
		const payload = req.body;
		//Todo Validate before you create
		let newId = 1;
		if (todos.length > 0) {
			newId = Number(todos[todos.length - 1]._id) + 1;
		}
		const todo = Object.assign({}, payload, {_id: newId});
		todos.push(todo);
		res.status(201).json(ApiResponse({
			message: 'successful',
			code: 200,
			data: todo
		}));
	}

	static find(req, res, next) {
		res.status(200).json(ApiResponse({
			message: 'successful',
			code: 200,
			data: todos
		}));
	}

	static update(req, res, next) {
		const payload = req.body;
		//Todo Validate if update should happen
		const todo = Object.assign({}, req.todo, payload);
		for (let i = 0; i < todos.length; i++) {
			if (String(todos[i]._id) === String(todo._id)) {
				todos[i] = todo;
				break;
			}
		}
		res.status(201).json(ApiResponse({
			message: 'successful',
			code: 200,
			data: todo
		}));
	}

	static findOne(req, res, next) {
		res.status(200).json(ApiResponse({
			message: 'successful',
			code: 200,
			data: req.todo
		}));
	}

	static delete(req, res, next) {
		const todo = req.todo;
		let index = -1;
		for (let i = 0; i < todos.length; i++) {
			if (String(todos[i]._id) === String(todo._id)) {
				index = i;
				break;
			}
		}
		todos.splice(index, 1);
		res.status(200).json(ApiResponse({
			message: 'successful',
			code: 200,
			data: {
				_id: todo._id,
			}
		}));
	}
}
