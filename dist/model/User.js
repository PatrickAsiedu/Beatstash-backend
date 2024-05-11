"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    username: { type: String },
    password: {
        type: String,
        // required: true
    },
    roles: {
        Lisener: {
            type: String,
            default: "listener",
        },
        Producer: String,
        // required: true
    },
    avatar: String,
}, { timestamps: true, toJSON: { virtuals: true } });
userSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "user",
});
exports.default = mongoose_1.default.model("User", userSchema);
