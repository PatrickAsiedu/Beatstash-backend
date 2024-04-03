import { RequestHandler } from "express";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import awsbucketconfig from "../config/awsbucketConfig";

const client = new S3Client(awsbucketconfig);

const AddNewBeat: RequestHandler = async (req, res, next) => {
  //crate middleware to check if file not sent, file size limiter and extensions allowed
  console.log(req.files);
  // if(req.files !== undefined){
  //   console.log(req.files[][0]:req.files);
  // }
  // console.log(req.body);
  // try {
  //   const uploadArtWork = await client.send(
  //     new PutObjectCommand({
  //       Bucket: process.env.AWS_BUCKET_NAME,
  //       Key: req.file?.originalname,
  //       Body: req.file?.buffer,
  //     })
  //   );
  //   const uploadMp3 = await client.send(
  //     new PutObjectCommand({
  //       Bucket: process.env.AWS_BUCKET_NAME,
  //       Key: req.file?.originalname,
  //       Body: req.file?.buffer,
  //     })
  //   );
  //   const uploadWav = await client.send(
  //     new PutObjectCommand({
  //       Bucket: process.env.AWS_BUCKET_NAME,
  //       Key: req.file?.originalname,
  //       Body: req.file?.buffer,
  //     })
  //   );
  //   res.status(200).send("Files uploaded");
  // } catch (error) {
  //   if (error instanceof Error) {
  //     console.error(error.message);
  //     res.status(500).send("Failed to upload files");
  //   }
  // }
  res.status(200).send("Files uploaded");
};

export { AddNewBeat };
