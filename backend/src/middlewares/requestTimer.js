const requestTimer = (req, res, next) => {
  const start = process.hrtime();

  // Hook into writeHead to inject the X-Response-Time header before response is sent
  const originalWriteHead = res.writeHead;
  res.writeHead = function (...args) {
    const diff = process.hrtime(start);
    const timeInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    res.setHeader("X-Response-Time", `${timeInMs}ms`);
    return originalWriteHead.apply(this, args);
  };

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const timeInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    console.log(`[Request Timer] ${req.method} ${req.originalUrl} - ${timeInMs}ms`);
  });

  next();
};

module.exports = requestTimer;
