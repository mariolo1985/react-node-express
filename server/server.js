import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

import { mainRoute } from './routes/main';
import { birdsRoute } from './routes/birds';
import { apiRoute } from './routes/api';
import { myLogger } from './middleware/logTime';
import { addTime } from './middleware/addTime';

dotenv.config(); // reads .env config

// app
const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // serving public assets
app.use(express.static(path.join(__dirname, 'www'))); // serving www assets
app.use(compression()); // compress it
app.use(fileUpload());

// backend stuff?  (to do: find out more)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// add middleware
app.use(myLogger);
app.use(addTime);

app.use('/', mainRoute);
app.use('/birds', birdsRoute);
app.get('/time', (req, res) => {
    res.send(`Hello! The time currently is ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
});

app.use('/api', apiRoute);

app.listen(process.env.PORT || 9999, () => console.log(`Starting dev on port ${process.env.PORT || 9999}`));
