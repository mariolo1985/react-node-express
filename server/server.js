import express from 'express';
const app = express();
const path = require('path');

import { mainRoute } from './routes/main';
const birdsRoute = require('./routes/birds');
const myLogger = require('./middleware/logTime');
const addTime = require('./middleware/addTime');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'www')));

// add middleware
app.use(myLogger);
app.use(addTime);

app.use('/', mainRoute);
app.use('/birds', birdsRoute);
app.get('/time', (req, res) => {
    res.send(`Hello! The time currently is ${req.requestTime}`);
});

app.listen(process.env.PORT || 3000, () => console.log(`Starting dev on port ${process.env.PORT}`));
