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
const client_s3_1 = require("@aws-sdk/client-s3");
const awsbucketConfig_1 = __importDefault(require("../../config/awsbucketConfig"));
const client = new client_s3_1.S3Client(awsbucketConfig_1.default);
const uploadObject = (file, id, dir) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `users/${id}/files/${dir}/${file.originalname}`;
    try {
        const upload = yield client.send(new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAM,
            Key: key,
            Body: file.buffer,
        }));
        // return upload;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
});
exports.default = uploadObject;
