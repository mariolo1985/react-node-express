import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../../src/components/App';
import { getDefaultPageTemplate } from '../PageTemplates/page';

const mainRoute = express.Router();
// middleware
mainRoute.use((req, res, next) => {
    console.log('Main Route Time: ', Date.now());
    next();
});

// get
mainRoute.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(getDefaultPageTemplate(renderToString(<App />)));
});

// post request
mainRoute.post('/', (req, res) => {
    res.send('Post request');
});

// put
mainRoute.put('/', (req, res) => {
    res.send('Put request');
});

// all request
mainRoute.all('/secretallrequest', (req, res, next) => {
    res.send(`you found the secret all request on ${req.requestTime}`);
    next();
});

// params
mainRoute.get('/users/:userId/books/:bookId', (req, res) => {
    // http://localhost:3000/users/34/books/8989
    res.send(req.params);
});

mainRoute.get('/flights/:from-:to', (req, res) => {
    // http://localhost:3000/flights/LAX-SFO
    res.send(req.params);
});

mainRoute.get('/plantae/:genus.:species', (req, res) => {
    // http://localhost:3000/plantae/Prunus.persica
    res.send(req.params);
});

// next callbacks
mainRoute.get('/example/b',
    (req, res, next) => {
        console.log('the response will be sent by the next function');
        next();
    },
    (req, res) => {
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

mainRoute.get('/example/c', [cb0, cb1, cb2]);

// route()
mainRoute.route('/book')
    .get(function (req, res) {
        res.send('Get a random book')
    })
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put(function (req, res) {
        res.send('Update the book')
    });

export { mainRoute };
