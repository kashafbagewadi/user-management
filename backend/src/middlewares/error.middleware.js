const errorMiddleware = (err, req, res, next) => {
    console.log('An error occured..', err);
    const statusCode = err.status ? err.status : 500;
    const msg = statusCode === 500 ? "Internal server error" : err.message;
    res.status(statusCode).json({"message":msg, "error": err.error})
}

export default errorMiddleware;