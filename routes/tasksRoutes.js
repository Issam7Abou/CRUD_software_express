import express from 'express';
import { getTasks, getTask } from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', getTasks);

router.get('/:id', getTask);

//router.post('/', );

//router.put('/', );

//router.delete('/', );

export default router;