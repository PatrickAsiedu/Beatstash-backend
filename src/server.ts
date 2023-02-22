import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
import morgan from "morgan"


import connectDB from "./config/dbConn"
import mongoose from "mongoose"
import * as Signup from "./routes/signup";



const PORT = process.env.DB_PORT || 3500
connectDB();

app.use(express.json)
app.use(morgan('dev'))

app.use('/signup', Signup.router)





mongoose.connection.once('open', (): void => {
    console.log('Connected to MongoDB')

    app.listen(PORT, (): void => console.log(`Server running on port ${PORT}`))
})