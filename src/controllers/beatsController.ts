import { RequestHandler } from "express";
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import awsbucketconfig from "../config/awsbucketConfig";
import { Files } from "../types/multerMultiFieldTypes";
import uploadObject from "../services/s3bucket/uploadObject";
import createPost from "../services/post/createPost";
import Post from "../model/Post";
import findPostList from "../services/post/findPostList";

const AddNewBeat: RequestHandler = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  const userId = "64ca4f56f6fb8b30b6ffc9be";

  const submittedFiles = req.files as Files;
  const artwork = submittedFiles["artwork"][0];
  const mp3 = submittedFiles["mp3"][0];
  const uploadPromises = [];

  const artworklink = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/users/${userId}/files/artwork/${artwork.originalname}`;
  const mp3link = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/users/${userId}/files/mp3/${mp3.originalname}`;

  if (typeof submittedFiles["wav"] !== "undefined") {
    const wav = submittedFiles["wav"][0];
    const wavlink = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/users/${userId}/files/wav/${wav.originalname}`;
    for (const [fields, files] of Object.entries(submittedFiles)) {
      files.forEach((file) => {
        uploadPromises.push(uploadObject(file, userId, fields));
      });
    }

    // uploadPromises.push(uploadObject(artwork, userId, "artwork"));
    // uploadPromises.push(uploadObject(mp3, userId, "mp3"));
    // uploadPromises.push(uploadObject(wav, userId, "wav"));

    uploadPromises.push(
      createPost({
        user: userId,
        title: data.title,
        tags: data.tags,
        key: data.key,
        bpm: data.bpm,
        artwork: artworklink,
        mp3: mp3link,
        wav: wavlink,
      })
    );

    Promise.all(uploadPromises)
      .then((results) => {
        console.log(results);
        return res.status(200).json({ message: "Beat Added" });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Failed to create post, please retry" });
      });
  } else {
    for (const [fields, files] of Object.entries(submittedFiles)) {
      files.map((file) => uploadObject(file, userId, fields));
    }

    uploadPromises.push(
      createPost({
        user: userId,
        title: data.title,
        tags: data.tags,
        key: data.key,
        bpm: data.bpm,
        artwork: artworklink,
        mp3: mp3link,
      })
    );
    Promise.all(uploadPromises)
      .then((results) => {
        console.log(results);
        return res.status(200).json({ message: "Beat Added" });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Failed to create post, please retry" });
      });
  }
};

const getAllBeats: RequestHandler = (req, res, next) => {
  const perPage = 10;
  let page = parseInt(req.query.page as string) || 1;

  if (!req.query.search) {
    //for skipping through large n_o of docs, avoid skip and implement based on the data you have e.g. date
    const beats = findPostList(page, perPage);

    return res.json(beats);
  }
};

export { AddNewBeat, getAllBeats };
