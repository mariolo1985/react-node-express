import express from 'express';
import path from 'path';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import DataSchema from './Data';
import { mainRoute } from './routes/main';
import { birdsRoute } from './routes/birds';
import { myLogger } from './middleware/logTime';
import { addTime } from './middleware/addTime';

dotenv.config(); // reads .env config

// databse setup
mongoose.connect(
    process.env.MONGODB_URL,
    {
        useNewUrlParser: true
    }
).then(() => { console.log('connection successful'); })
    .catch((err) => { console.log('init connect error: ', err); });

const Data = mongoose.model('Data', DataSchema);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb connection error: '));
db.on('connected', console.error.bind(console, 'MongoDb connection connected'));
db.on('disconnected', console.error.bind(console, 'MongoDb connection disconnecting'));
db.on('connecting', console.error.bind(console, 'MongoDb connection connecting'));
db.once('open', () => {
    const data = new Data({
        message: `Database opened on ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`
    });
    data.markModified('message');
    data.save((err) => {
        if (err) console.log('has error: ', err);
    });
});

// app
const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // serving public assets
app.use(express.static(path.join(__dirname, 'www'))); // serving www assets
app.use(compression()); // compress it

// backend stuff?  (to do: find out more)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// add middleware
app.use(myLogger);
app.use(addTime);

// add routes
const router = express.Router();

app.use('/', mainRoute);
app.use('/birds', birdsRoute);
app.get('/time', (req, res) => {
    res.send(`Hello! The time currently is ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
});

// this method fetches all available data in our database
router.get('/getdata', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data });
    });
});

// this method adds new data in our database
router.post('/putData', (req, res) => {
    const { message } = req.body;
    const data = new Data({
        message
    });
    data.markModified('message');

    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

app.use('/api', router);

app.listen(process.env.PORT || 9999, () => console.log(`Starting dev on port ${process.env.PORT}`));
