module.exports = function myLogger(req, res, next) {
    console.log('LOGGED');
    next();
};
