function requestLogger(req, res, next) {
  console.log(
    `[PrimeTrade] ${req.method} ${req.originalUrl} - user: ${
      req.user ? req.user.id + " (" + req.user.role + ")" : "anonymous"
    }`
  );
  next();
}

module.exports = function requestLogger(req, res, next) {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
};
