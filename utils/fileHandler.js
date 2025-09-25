import fs from 'fs/promises';

const filePath = './database/db.json';

const readFile = async (id) => {
    const data = await fs.readFile(filePath, 'utf-8');
    if(!data) {
        const err = new Error('Could not read file');
        throw err;
    };
    const dadosJs = JSON.parse(data);
    if(id) return dadosJs.find((task) => task.id === id);
    return dadosJs;
};

const writeFile = async (task) => {
    const data = await fs.readFile(filePath, 'utf-8');
    if(!data) {
        const err = new Error('Could not read file');
        throw err;
    };        
    const allTasks = JSON.parse(data);
    allTasks.push(task);
    console.log('writeFile :', allTasks);
    await fs.writeFile(filePath, JSON.stringify(allTasks, null, 2));
};

export { readFile, writeFile };