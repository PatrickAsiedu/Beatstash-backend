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
const Post_1 = __importDefault(require("../../model/Post"));
// interface PostListResult {
//   total: number;
//   posts: PostDocument[];
// }
const findPostList = (page, perPage, search, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = search
            ? {
                sort: { score: { $meta: "textScore" } },
            }
            : {};
        const projection = search
            ? { title: 1, tags: 1, score: { $meta: "textScore" } }
            : { title: 1, tags: 1 };
        const postsP = Post_1.default.find(filter, projection, options)
            .populate({
            path: "user",
            select: { _id: 0, email: 1 },
        })
            .limit(perPage)
            .skip((page - 1) * perPage)
            .exec();
        const totalP = Post_1.default.countDocuments(filter);
        const [posts, total] = yield Promise.all([postsP, totalP]);
        return { total, posts };
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error("An error occured while querying Posts");
    }
});
exports.default = findPostList;
