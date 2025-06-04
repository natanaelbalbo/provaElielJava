import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();
const taskController = new TaskController();

router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.put('/:id/status', taskController.updateStatus);
router.delete('/:id', taskController.delete);

export default router;
