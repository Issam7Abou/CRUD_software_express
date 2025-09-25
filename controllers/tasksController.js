import readFile from "../utils/fileHandler.js";

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
        console.log('o ID é: ', id);
        if(!isFinite(id)) {
            const err = new Error('Please provide a valid ID for task');
            err.status = 404;
            throw err;
        };
        const task = await readFile(id);
        console.log('a task é no getTask: ', task);
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

export { getTasks, getTask };