import express from 'express';
import { getTasks, getTask, postTask, updateTask } from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', getTasks);

router.get('/:id', getTask);

router.post('/', postTask);

router.put('/:id', updateTask);

//router.delete('/', );

export default router;