import fs from 'fs/promises';
import { findTaskByIdOrThrow , idCreator } from './idHandler.js';

const filePath = './database/db.json';

const readFile = async (id) => {
    const data = await fs.readFile(filePath, 'utf-8');
    if(!data) {
        const err = new Error('Could not read file');
        throw err;
    };
    const dadosJs = JSON.parse(data);
    if(id) return findTaskByIdOrThrow(id, dadosJs); 
    return dadosJs;
};

const writeFile = async (task) => {
    const data = await fs.readFile(filePath, 'utf-8');
    if(!data) {
        const err = new Error('Could not read file');
        throw err;
    };        
    const allTasks = JSON.parse(data);
    idCreator(task);
    allTasks.push(task);
    console.log('writeFile :', allTasks);
    await fs.writeFile(filePath, JSON.stringify(allTasks, null, 2));
};

const updateTaskFile = async (task, id) => {
    const data = await fs.readFile(filePath, 'utf-8');
    if(!data) {
        const err = new Error('Could not read file');
        throw err;
    };  
    const allTasks = JSON.parse(data);
    const oldTask = allTasks.find((task) => task.id === id);
    if (task.title) oldTask.title = task.title;
    if (task.description) oldTask.description = task.description;
    await fs.writeFile(filePath, JSON.stringify(allTasks, null, 2));
};

const deleteTaskFile = async (id) => {
    const data = await fs.readFile(filePath, 'utf-8');
    if(!data) {
        const err = new Error('Could not read file');
        throw err;
    }; 
    const allTasks = JSON.parse(data);
    findTaskByIdOrThrow(id, allTasks); 
    const newDb = allTasks.filter((task) => task.id !== id);
    await fs.writeFile(filePath, JSON.stringify(newDb, null, 2));
};

export { readFile, writeFile, updateTaskFile, deleteTaskFile };