const validateTaskPayload = (task) => {
    return (task.title && task.description) ? true : false;
};

const validateUpdatePayload = (task) => {
    return (task.title || task.description) ? true : false;
}

export { validateTaskPayload, validateUpdatePayload };