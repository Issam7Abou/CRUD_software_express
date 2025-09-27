const findTaskByIdOrThrow = (id, allTasks) => {
    const idExists = allTasks.some((task) => task.id === id);
    if(!idExists) {
        const err = new Error('ID provided does not exist');
        err.status = 404;
        throw err; 
    };
    return allTasks.find((task) => task.id === id);
};

const idCreator = (task) => {
    console.log('id creator: ', task);
    task.id = Date.now();
    return task;
};

export { findTaskByIdOrThrow, idCreator };