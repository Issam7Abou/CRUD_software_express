import fs from 'fs/promises';

const filePath = './database/db.json';

const readFile = async (id, next) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        if(!data) throw new Error('Could not read file');
        const dadosJs = JSON.parse(data);
        if(id) return dadosJs.find((task) => task.id === id);
        return dadosJs;
    } catch (error) {
        next(error);
    }
};



export default readFile;