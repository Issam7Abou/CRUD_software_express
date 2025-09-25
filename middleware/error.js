const errorHandler = (err, req, res, next) => {
    console.error('Middleware Global', err.status, err.message);

    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};

export default errorHandler;