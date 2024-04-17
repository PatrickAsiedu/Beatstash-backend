"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awsbucketconfig = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3BUCKET_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3BUCKET_SECRETACCESSK_KEY,
    },
};
exports.default = awsbucketconfig;
