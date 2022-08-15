const errorHandler = (err, req, res, next) => {
  // If status exists use it, otherwise status 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Response with status
  res.status(statusCode);

  // Response with Error Message
  // ? if in development, also response with stack details
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
