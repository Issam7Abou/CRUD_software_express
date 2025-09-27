const errorCreator = (type, data,  msg, error) => {
    switch (type) {
        case 'dataExists?':
            if (!data) {
                const err = new Error(msg);
                err.status = error;
                throw err;
            }
            break;
        default:
            break;
    }
};

export default errorCreator;