const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/', (req, res) => {
    res.send('Post request');
});

app.put('/', (req, res) => {
    res.send('Put request');
});

app.listen(3000, () => console.log(`Starting on port ${process.env}`));
