const express = require('express');
var router = express.Router();

// middleware
router.use((req, res, next) => {
    console.log('Main Time: ', Date.now());
    next();
});

// get
router.get('/', (req, res) => {
    res.send('Server rendered');
});

// post request
router.post('/', (req, res) => {
    res.send('Post request');
});

// put
router.put('/', (req, res) => {
    res.send('Put request');
});

// all request
router.all('/secretallrequest', (req, res, next) => {
    res.send(`you found the secret all request on ${req.requestTime}`);
    next();
});

// params
router.get('/users/:userId/books/:bookId', (req, res) => {
    // http://localhost:3000/users/34/books/8989
    res.send(req.params);
});

router.get('/flights/:from-:to', (req, res) => {
    // http://localhost:3000/flights/LAX-SFO
    res.send(req.params);
});

router.get('/plantae/:genus.:species', (req, res) => {
    // http://localhost:3000/plantae/Prunus.persica
    res.send(req.params);
});

// next callbacks
router.get('/example/b',
    function (req, res, next) {
        console.log('the response will be sent by the next function');
        next();
    },
    function (req, res) {
        res.send('hello from B');
    }
);

const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
};

const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
};

const cb2 = function (req, res) {
    res.send('Hello from C!')
};

router.get('/example/c', [cb0, cb1, cb2]);

// route()
router.route('/book')
    .get(function (req, res) {
        res.send('Get a random book')
    })
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put(function (req, res) {
        res.send('Update the book')
    });

module.exports = router;
