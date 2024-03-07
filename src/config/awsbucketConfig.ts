const awsbucketconfig = {
  region: process.env.AWS_REGION,

  credentials: {
    accessKeyId: process.env.AWS_S3BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3BUCKET_SECRETACCESSK_KEY,
  },
};

export default awsbucketconfig;
