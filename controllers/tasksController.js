import { json } from "express";
import { readFile , writeFile, updateTaskFile, deleteTaskFile } from "../utils/fileHandler.js";
import { validateTaskPayload, validateUpdatePayload } from "../utils/validateRequestBody.js";

// @desc get all tasks
// @Route GET - /api/tasks
const getTasks = async (req, res, next) => {
    try {
        const allTasks = await readFile();
        if(!allTasks) {
            const err = new Error('There is no Tasks');
            err.status = 404;
            throw err;
        }
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
        if(!isFinite(id)) {
            const err = new Error('Please provide a valid ID for task');
            err.status = 404;
            throw err;
        };
        const task = await readFile(id);
        if(!task) {
            const err = new Error('The ID provided does not Exist');
            err.status = 404;
            throw err;
        }
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
        if (!task) {
            const err = new Error('Please provide JSON data to post a task');
            err.status = 404;
            throw err; 
        }
        const validator = validateTaskPayload(task);
        if(!validator) {
            const err = new Error('Please provide title & description of task in your JSON');
            err.status = 404;
            throw err; 
        }
        await writeFile(task);
        res.status(201).json('New Task Posted'); 
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const task = req.body;
        if(!validateUpdatePayload(task)) {
            const err = new Error('Please provide atleast title OR description of task to UPDATE in your JSON');
            err.status = 404;
            throw err; 
        }
        await updateTaskFile(task, id);
        const allTasks = await readFile();
        res.status(200).json(allTasks);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if(!isFinite(id)) {
            const err = new Error('Please provide a valid ID to delete Task');
            err.status = 404;
            throw err;
        };
        console.log('o ID é: ', id);
        await deleteTaskFile(id);
        const allTasks = await readFile();
        res.status(200).json(allTasks);
    } catch (error) {
        next(error);
    }
};

export { getTasks, getTask, postTask, updateTask, deleteTask };