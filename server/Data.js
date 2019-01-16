import mongoose from 'mongoose';

// this will be our data base's data structure
const DataSchema = new mongoose.Schema(
    {
        message: String
    }
);

// export the new Schema so we could modify it using Node.js
export default DataSchema;
