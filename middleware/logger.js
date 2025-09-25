const logger = (req, res, next) => {
    console.log(`${req.method} - ${req.protocol} - ${req.url}`);
    next();
};

export default logger;