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

dotenv.config();
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'www')));
app.use(compression());

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

// backend stuff
const dbRoute = process.env.MONGODB_URL;
mongoose.connect(
    dbRoute,
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
    console.log('connected to database...');
    let data = new Data({
        message: `Init Message on ${ new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') }`
    });
    data.markModified('message');
    console.log('putData data: ', data);
    console.log('typeof data: ', typeof data.save);
    data.save((err, datar) => {
        console.log('in save: ', datar);
        if (err) console.log('has error: ', err);
    });
});

const router = express.Router();


// this is our get method
// this method fetches all available data in our database
router.get('/getdata', (req, res) => {
    console.log('db status: ', db.readyState);

    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data });
    });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
    console.log('putData req.body: ', req.body);

    const { message } = req.body;
    let data = new Data({
        message
    });
    data.markModified('message');
    /*
    data.message = message;
    data.markModified('message');
    data.id = id;
    data.markModified('id');
    */
    console.log('putData data: ', data);
    console.log('typeof data: ', typeof data.save);
    data.save((err, datar) => {
        console.log('in save: ', datar);
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });

    // return res.json({ success: false, error: 'Save failed' });
});

app.use('/api', router);

app.listen(process.env.PORT || 3000, () => console.log(`Starting dev on port ${ process.env.PORT }`));
