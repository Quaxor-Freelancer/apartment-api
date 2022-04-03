function errorHandler(
  err,
  req,
  res,
  next
) {
  console.log(err)
  let customError = err;
  if (err instanceof Error) {
    customError = { status: 500, error:"Internal Server Error"}
  }
  const statusCode = typeof(customError?.status) === "number" ? customError?.status : 500
  res.status(statusCode).json(customError);
};

module.exports = errorHandler;