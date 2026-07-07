const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, originalUrl, ip } = req;

  console.log(`[${timestamp}] Incoming: ${method} ${originalUrl} from IP ${ip}`);

  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] Completed: ${method} ${originalUrl} with Status ${res.statusCode}`
    );
  });

  next();
};

module.exports = loggerMiddleware;
