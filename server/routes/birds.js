var express = require('express');
var router = express.Router();

// middleware
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// homepage route
router.get('/', (req, res) => {
    res.send('Birds home page');
});

router.get('/about', (req, res) => {
    res.send('about birds');
});

module.exports = router;
