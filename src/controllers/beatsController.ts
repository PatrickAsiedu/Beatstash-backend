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

const getAllBeats: RequestHandler = async (req, res, next) => {
  const perPage = 10;

  let page = parseInt(req.query.page as string) || 1;
  let search = "";

  console.log(page);
  if (!req.query.search) {
    //for skipping through large n_o of docs, avoid skip and implement based on the data you have e.g. date n cursor
    const beats = await findPostList(page, perPage, {});
    // console.log(perPage);
    return res.status(200).json(beats);
  }

  if (req.query.search) {
    const search = req.query.search as string;
    console.log(search);
    if (search.split(" ").length === 1) {
      const beats = await findPostList(page, perPage, {
        $text: { $search: search },
      });
      return res.status(200).json(beats);
    } else {
      const words = search.split(" ");
      let allwords = "";
      words.forEach((word) => (allwords = allwords + " " + word));
      console.log(allwords);
      console.log(`\"${search}\" ${allwords}`);
      const beats = await findPostList(page, perPage, {
        $text: { $search: `\"${search}\" ${allwords}` },
      });
      return res.status(200).json(beats);
    }
  }
};

export { AddNewBeat, getAllBeats };
