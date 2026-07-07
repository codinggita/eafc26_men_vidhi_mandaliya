module.exports = {
  rateLimiter: {
    apiWindowMs: 15 * 60 * 1000, // 15 minutes
    apiMax: 100, // max requests per windowMs
    authWindowMs: 60 * 60 * 1000, // 1 hour
    authMax: 15, // max registration/login attempts per hour
  },
};
