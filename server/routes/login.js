import express from 'express';
import AWS from 'aws-sdk';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

global.fetch = fetch;

dotenv.config(); // reads .env config
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
 * cognito work
 *
 * */

const loginRoute = express.Router();

loginRoute.get('/adduser', (req, res) => {
    const poolData = {
        UserPoolId: 'us-east-1_OnLvMY6yR', // Your user pool id here
        ClientId: '7klm3gi1n3c7hus19arfr6jenv' // Your client id here
    };

    const userPool = new CognitoUserPool(poolData);

    const dataEmail = {
        Name: 'email',
        Value: 'email@mydomain.com'
    };

    const dataPhoneNumber = {
        Name: 'phone_number',
        Value: '+15555555555'
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

    const attributeList = [];
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    userPool.signUp('awsjsuser', 'Password*1', attributeList, null, (err, result) => {
        if (err) {
            return res.json({ success: false, error: err });
        }
        const cognitoUser = result.user;
        console.log(cognitoUser);
        res.json({ user: cognitoUser.getUsername() });
    });
});

export { loginRoute };
