const errorMessageList = {
  400: "Bad request",
  401: "No authorized",
  403: "Fobidden",
  404: "Not found",
  409: "Conflict",
};

const HttpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;





  // module.exports = (error, req, res, next) => {
  //   console.log(res.statusCode);
  //   const statusCode = res.statusCode || 500;
  //   const errorStack =
  //     process.env.NODE_ENV === "development" ? error.stack : null;
  //   res.status(statusCode);
  //   res.json({ code: statusCode, stack: errorStack });
  // };