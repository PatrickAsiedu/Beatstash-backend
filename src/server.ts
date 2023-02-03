import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()

import connectDB from "./config/dbConn"
import mongoose from "mongoose"

const PORT = process.env.DB_PORT || 3500
connectDB();



mongoose.connection.once('open',():void=> {console.log('Connected to MongoDB')

app.listen(PORT, ():void=> console.log(`Server running on port ${PORT}`))
})