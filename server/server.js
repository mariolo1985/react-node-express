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

app.listen(process.env.PORT, () => console.log(`Starting on port ${process.env.PORT}`));
