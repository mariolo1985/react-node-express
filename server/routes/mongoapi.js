import express from 'express';
import mongoose from 'mongoose';
import DataSchema from '../Data';

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

// add routes
const mongoapi = express.Router();
// this method fetches all available data in our database
mongoapi.get('/getdata', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data });
    });
});

// this method adds new data in our database
mongoapi.post('/putData', (req, res) => {
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

export { mongoapi };
