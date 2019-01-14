export const myLogger = (req, res, next) => {
    console.log('LOGGED');
    next();
};
