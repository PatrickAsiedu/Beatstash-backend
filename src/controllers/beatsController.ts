import { RequestHandler } from "express";
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import awsbucketconfig from "../config/awsbucketConfig";
import { Files } from "../types/multerMultiFieldTypes";
import uploadObject from "../services/s3bucket/uploadObject";
import createPost from "../services/post/createPost";
import Post from "../model/Post";
import findPostList from "../services/post/findPostList";
import findPostById from "../services/post/findPostById";

// @desc Get all beats
// @route GET /beats
// @access Public
const getAllBeats: RequestHandler = async (req, res, next) => {
  const perPage = 10;

  let page = parseInt(req.query.page as string) || 1;
  let search = "";

  if (!req.query.search || req.query.search === "") {
    //for skipping through large n_o of docs, avoid skip and implement based on the data you have e.g. date n cursor

    const { total, posts: beats } = await findPostList(
      page,
      perPage,
      search,
      {}
    );

    // console.log(total);
    // console.log(beats?.length);
    return res.status(200).json({ perPage, total, beats });
  }

  if (req.query.search) {
    const search = req.query.search as string;
    console.log(search);
    if (search.split(" ").length === 1) {
      const { total, posts: beats } = await findPostList(
        page,
        perPage,
        search,
        {
          $text: { $search: search },
        }
      );
      // console.log(beats?.length);
      typeof beats !== "undefined" && beats?.length > 0
        ? res.status(200).json({ perPage, total, beats })
        : res.status(404).json({ message: "no data matches query" });
    } else {
      // const words = search.split(" ");
      // let allwords = "";
      // words.forEach((word) => (allwords = allwords + " " + word));
      // // console.log(allwords);
      // // console.log(`\"${search}\" ${allwords}`);
      // // console.log(`${search} ${search.split(" ").join("")}`)
      // // console.log(`\'${search}\' \'${allwords}\' `);
      // console.log(`\'${search}\' \'${search.split(" ").join("")}\' `);
      //double quotes for logical and single for or
      const { total, posts: beats } = await findPostList(
        page,
        perPage,
        search,
        {
          $text: {
            $search: `\'${search}\' \'${search.split(" ").join("")}\' `,
          }, //logical OR b2n phrases + OR b2n terms of the phrases
        }
      );
      // console.log(beats?.length);
      typeof beats !== "undefined" && beats?.length > 0
        ? res.status(200).json({ perPage, total, beats })
        : res.status(404).json({ message: "no data matches query" });
    }
  }
};

// @desc Get a beat
// @route GET /beats/id
// @access Public
const getBeat: RequestHandler = async (req, res, next) => {
  const id = "111111";

  const beat = await findPostById(id);
};

// @desc Add a beat
// @route POST /beats
// @access Private
const addNewBeat: RequestHandler = async (req, res, next) => {
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

export { addNewBeat, getAllBeats, getBeat };
