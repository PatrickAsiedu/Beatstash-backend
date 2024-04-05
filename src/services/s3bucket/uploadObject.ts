import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import awsbucketconfig from "../../config/awsbucketConfig";

const client = new S3Client(awsbucketconfig);

const uploadObject = async (file: Express.Multer.File, id: any, dir: any) => {
  const key = `users/${id}/files/${dir}/${file.originalname}`;

  try {
    const upload = await client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
      })
    );
    // return upload;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return new Promise((resolve, reject) => {
        reject("s3 bucket error");
      });
    }
  }
};
export default uploadObject;
