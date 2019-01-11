const express = require('express');
const app = express();
const path = require('path');

const mainRoute = require('./routes/main');
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

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.listen(3000, () => console.log(`Starting dev on port ${process.env.PORT}`));
} else {
    app.listen(process.env.PORT, () => console.log(`Starting prod on port ${process.env.PORT}`));
}