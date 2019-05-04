import { Router } from 'express';
import auth from '../../middleware/auth';
import Todo from './todo.controller';

const router = Router();
router.use(auth);
router.route('/todos')
	.post(Todo.create)
	.get(Todo.find);
router.param('id', Todo.id);
router.route('/todos/:id')
	.get(Todo.findOne)
	.put(Todo.update)
	.delete(Todo.delete);
export default router;
