module.exports = function addTime(req, res, next) {
    req.requestTime = Date.now();
    next();
};
