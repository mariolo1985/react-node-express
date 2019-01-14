export const addTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};
