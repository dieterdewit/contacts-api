import { Request, Response } from 'express'
import { connect } from "../database";
var aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.S3_KEY_CONTACTS,
    secretAccessKey: process.env.S3_SECRET_CONTACTS
})

const S3_BUCKET = process.env.BUCKET_NAME_CONTACTS

export async function sign_s3 (req: Request, res: Response) {
    const conn = await connect();
    const s3 = new aws.S3();
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    const contactId = req.body.contactId;

    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 500,
        ContentType: fileType,
        ACL: 'public-read'
    };

    const image_uri = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`

    console.log(image_uri)

    await conn.query('UPDATE contacts SET image_uri = ? WHERE contact_id = ?', [image_uri.toString(), contactId]);

    // Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err: any, data: any) => {
        if(err){
            console.log(err);
            res.json({success: false, error: err})
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
        const returnData = {
            signedRequest: data,
            url: image_uri
        };
        res.json({success:true, data:{returnData}});
    });
}
