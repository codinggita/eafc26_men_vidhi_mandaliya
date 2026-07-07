const cleanMongo = (val) => {
  if (val !== null && typeof val === "object") {
    for (const key in val) {
      if (key.startsWith("$")) {
        delete val[key];
      } else {
        cleanMongo(val[key]);
      }
    }
  }
  return val;
};

const cleanXss = (val) => {
  if (typeof val === "string") {
    return val
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  }
  if (Array.isArray(val)) {
    return val.map(cleanXss);
  }
  if (val !== null && typeof val === "object") {
    const cleaned = {};
    for (const key in val) {
      cleaned[key] = cleanXss(val[key]);
    }
    return cleaned;
  }
  return val;
};

const mongoSanitizer = (req, res, next) => {
  if (req.body) cleanMongo(req.body);
  if (req.params) cleanMongo(req.params);
  if (req.query) cleanMongo(req.query);
  next();
};

const xssSanitizer = (req, res, next) => {
  if (req.body) req.body = cleanXss(req.body);
  if (req.query) req.query = cleanXss(req.query);
  if (req.params) req.params = cleanXss(req.params);
  next();
};

module.exports = {
  mongoSanitizer,
  xssSanitizer,
};
