import express from 'express';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import uuidv1 from 'uuid/v1';

dotenv.config(); // reads .env config

const albumBucketName = process.env.AWS_S3_ALBUM_BUCKET_NAME;
const bucketRegion = process.env.AWS_S3_ALBUM_BUCKET_REGION;
const IdentityPoolId = process.env.AWS_S3_ALBUM_IDENTITY_POOL_ID;

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId
    })
});

/** **
 *
 * S3 work
 *
 * */
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: albumBucketName },
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY_ID
    }
});

/** **
 *
 * Dynamodb work
 *
 * */
const ddb = new AWS.DynamoDB({
    apiVersion: '2012-10-08',
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY_ID
    }
});


const apiRoute = express.Router();

// real APIs
apiRoute.post('/addimage', (req, res) => {
    const fileToUpload = req.files.file;
    const { data, name } = fileToUpload;
    s3.upload({
        Key: `${uuidv1()}${name.substring(name.lastIndexOf('.'))}`,
        Body: data,
        Bucket: albumBucketName
    }, (uploadError, uploadData) => {
        if (uploadError) return res.json({ success: false, error: uploadError });

        const itemId = uuidv1().toString();
        const putParams = {
            TableName: 'Userdev',
            Item: {
                id: { S: itemId },
                imageUrl: { S: uploadData.Location }
            }
        };

        ddb.putItem(putParams, (putError) => {
            if (putError) {
                return res.json({ success: false, error: putError });
            }

            return res.json(
                {
                    success: true,
                    itemData: {
                        imageUrl: uploadData.Location,
                        itemId
                    }
                }
            );
        });
    });
});

// fix me - delete me when dev complete
apiRoute.get('/secretdev', (req, res) => {
    const params = {
        TableName: 'Userdev',
        Key: {
            id: { S: 'fbfafed0-1f61-11e9-a6b2-31086bd691de' },
        }
    };

    // Call DynamoDB to read the item from the table
    ddb.getItem(params, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ scucess: true, itemData: data.Item });
    });
});

export { apiRoute };
