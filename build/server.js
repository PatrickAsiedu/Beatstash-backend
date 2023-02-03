"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dbConn_1 = __importDefault(require("./config/dbConn"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.DB_PORT || 3500;
(0, dbConn_1.default)();
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
