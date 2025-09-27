import { readFile , writeFile, updateTaskFile, deleteTaskFile } from "../utils/fileHandler.js";
import { validateTaskPayload, validateUpdatePayload } from "../utils/validateRequestBody.js";
import errorCreator from "../utils/errorServices.js";

// @desc get all tasks
// @Route GET - /api/tasks
const getTasks = async (req, res, next) => {
    try {
        const allTasks = await readFile();
        errorCreator('dataExists?', allTasks, 'There is no Tasks - new func', 404);
        res.status(200).json(allTasks);
    } catch (error) {
        next(error);
    }
};

// @desc get a single task
// @Route GET - /api/tasks/:id
const getTask = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const validator = isFinite(id);
        errorCreator('dataExists?', validator, 'Please provide a valid ID for task - new func', 404);
        const task = await readFile(id);
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

// @desc post a task
// @Route POST - /api/tasks
const postTask = async (req, res, next) => {
    try {
        const task = req.body;
        errorCreator('dataExists?', task, 'Please provide JSON data to post a task - new func', 404);
        const validator = validateTaskPayload(task);
        errorCreator('dataExists?', validator, 'Please provide title & description of task in your JSON - new func', 404);
        await writeFile(task);
        res.status(201).json('New Task Posted'); 
    } catch (error) {
        next(error);
    }
};

// @desc update a task
// @Route PUT - /api/tasks/:id
const updateTask = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const isIdValid = isFinite(id);
        errorCreator('dataExists?', isIdValid, 'The ID provided is not a number - new func', 404);
        const task = req.body;
        const validator = validateUpdatePayload(task);
        errorCreator('dataExists?', validator, 'Please provide atleast title OR description of task to UPDATE in your JSON', 404);
        await updateTaskFile(task, id);
        const allTasks = await readFile();
        res.status(200).json(allTasks);
    } catch (error) {
        next(error);
    }
};

// @desc delete a task
// @Route DELETE - /api/tasks/:id
const deleteTask = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const validator = isFinite(id);
        errorCreator('dataExists?', validator, 'Please provide a valid ID to delete Task - new func', 404);
        await deleteTaskFile(id);
        const allTasks = await readFile();
        res.status(200).json(allTasks);
    } catch (error) {
        next(error);
    }
};

export { getTasks, getTask, postTask, updateTask, deleteTask };