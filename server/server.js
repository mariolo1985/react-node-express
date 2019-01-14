import express from 'express';
import path from 'path';

import { mainRoute } from './routes/main';
import { birdsRoute } from './routes/birds';
import { myLogger } from './middleware/logTime';
import { addTime } from './middleware/addTime';

const app = express();
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
