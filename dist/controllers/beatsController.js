"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeat = exports.getAllBeats = exports.addNewBeat = void 0;
const uploadObject_1 = __importDefault(require("../services/s3bucket/uploadObject"));
const createPost_1 = __importDefault(require("../services/post/createPost"));
const findPostList_1 = __importDefault(require("../services/post/findPostList"));
const findPostById_1 = __importDefault(require("../services/post/findPostById"));
// @desc Get all beats
// @route GET /beats
// @access Public
const getAllBeats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 10;
    let perPage;
    let total_pages;
    let page = parseInt(req.query.page) || 1;
    let search = "";
    if (!req.query.search || req.query.search === "") {
        //for skipping through large n_o of docs, avoid skip and implement based on the data you have e.g. date n cursor
        const acceptableParams = ["key", "bpm"];
        // Filter req.query to include only acceptable parameters
        const filteredQuery = Object.keys(req.query)
            .filter((key) => acceptableParams.includes(key))
            .reduce((obj, key) => {
            if (req.query[key]) {
                obj[key] = req.query[key];
            }
            return obj;
        }, {});
        // Construct MongoDB query using the filtered query parameters
        const query = [];
        for (const key in filteredQuery) {
            if (filteredQuery.hasOwnProperty(key)) {
                let condition = {};
                const value = filteredQuery[key];
                // Determine the operator based on the type of field
                if (key === "key") {
                    // For numeric fields, use $eq operator
                    condition[key] = { $eq: value };
                }
                else if (key === "bpm") {
                    // For other fields, use $regex for case-insensitive partial match
                    condition[key] = { $eq: value };
                }
                query.push(condition);
            }
        }
        const { total, posts: beats } = yield (0, findPostList_1.default)(page, limit, search, {
            $and: query,
        });
        // console.log(total);
        // console.log(beats?.length);
        total_pages = Math.ceil(total / limit);
        page < total_pages && total % limit === 0
            ? (perPage = 10)
            : total_pages === page
                ? (perPage = total % limit)
                : (perPage = 0);
        (beats === null || beats === void 0 ? void 0 : beats.length) > 0
            ? res
                .status(200)
                .json({ page, perPage, total, total_pages, posts: beats })
            : res.status(404).json({ message: "no data matches query" });
    }
    if (req.query.search) {
        const search = req.query.search;
        console.log(search);
        if (search.split(" ").length === 1) {
            const { total, posts: beats } = yield (0, findPostList_1.default)(page, limit, search, {
                $text: { $search: search },
            });
            console.log(beats === null || beats === void 0 ? void 0 : beats.length);
            total_pages = Math.ceil(total / limit);
            page < total_pages && total % limit === 0
                ? (perPage = 10)
                : total_pages === page
                    ? (perPage = total % limit)
                    : (perPage = 10);
            typeof beats !== "undefined" && (beats === null || beats === void 0 ? void 0 : beats.length) > 0
                ? res
                    .status(200)
                    .json({ page, perPage, total, total_pages, posts: beats })
                : res.status(404).json({ message: "no data matches query" });
        }
        else {
            // const words = search.split(" ");
            // let allwords = "";
            // words.forEach((word) => (allwords = allwords + " " + word));
            // // console.log(allwords);
            // // console.log(`\"${search}\" ${allwords}`);
            // // console.log(`${search} ${search.split(" ").join("")}`)
            // // console.log(`\'${search}\' \'${allwords}\' `);
            // console.log(`\'${search}\' \'${search.split(" ").join("")}\' `);
            //double quotes for logical and single for or
            const { total, posts: beats } = yield (0, findPostList_1.default)(page, limit, search, {
                $text: {
                    $search: `\'${search}\' \'${search.split(" ").join("")}\' `,
                }, //logical OR b2n phrases + OR b2n terms of the phrases
            });
            // console.log(beats?.length);
            total_pages = Math.ceil(total / limit);
            page < total_pages && total % limit === 0
                ? (perPage = 10)
                : total_pages === page
                    ? (perPage = total % limit)
                    : (perPage = 10);
            typeof beats !== "undefined" && (beats === null || beats === void 0 ? void 0 : beats.length) > 0
                ? res
                    .status(200)
                    .json({ page, perPage, total, total_pages, posts: beats })
                : res.status(404).json({ message: "no data matches query" });
        }
    }
});
exports.getAllBeats = getAllBeats;
// @desc Get a beat
// @route GET /beats/id
// @access Public
const getBeat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = "111111";
    const beat = yield (0, findPostById_1.default)(id);
});
exports.getBeat = getBeat;
// @desc Add a beat
// @route POST /beats
// @access Private
const addNewBeat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    const userId = "64ca4f56f6fb8b30b6ffc9be";
    const submittedFiles = req.files;
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
                uploadPromises.push((0, uploadObject_1.default)(file, userId, fields));
            });
        }
        // uploadPromises.push(uploadObject(artwork, userId, "artwork"));
        // uploadPromises.push(uploadObject(mp3, userId, "mp3"));
        // uploadPromises.push(uploadObject(wav, userId, "wav"));
        uploadPromises.push((0, createPost_1.default)({
            user: userId,
            title: data.title,
            tags: data.tags,
            key: data.key,
            bpm: data.bpm,
            artwork: artworklink,
            mp3: mp3link,
            wav: wavlink,
        }));
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
    else {
        for (const [fields, files] of Object.entries(submittedFiles)) {
            files.map((file) => (0, uploadObject_1.default)(file, userId, fields));
        }
        uploadPromises.push((0, createPost_1.default)({
            user: userId,
            title: data.title,
            tags: data.tags,
            key: data.key,
            bpm: data.bpm,
            artwork: artworklink,
            mp3: mp3link,
        }));
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
});
exports.addNewBeat = addNewBeat;
