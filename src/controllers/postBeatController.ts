import { RequestHandler } from "express";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import awsbucketconfig from "../config/awsbucketConfig";

const client = new S3Client(awsbucketconfig);

const handlePostBeat: RequestHandler = async (req, res, next) => {
  //crate middleware to check if file not send, file size limiter and extensions allowed
  console.log(req.file);
  console.log(req.file);

  try {
    const response = await client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file?.originalname,
        Body: req.file?.buffer,
      })
    );
    res.status(200).send("File uploaded");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).send("Failed to upload file");
    }
  }
};

export { handlePostBeat };
