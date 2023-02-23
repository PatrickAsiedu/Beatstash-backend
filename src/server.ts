import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response, NextFunction } from "express"
const app = express()
import morgan from "morgan"


import connectDB from "./config/dbConn"
import mongoose from "mongoose"
import * as Signup from "./routes/signup";



const PORT = process.env.DB_PORT || 3500
connectDB();

// built-in middleware for json 
app.use(express.json())

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

//middleware for logging
app.use(morgan('dev'))

app.use('/signup', Signup.router)








mongoose.connection.once('open', (): void => {
    console.log('Connected to MongoDB')

    app.listen(PORT, (): void => console.log(`Server running on port ${PORT}`))
})