import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response, NextFunction } from "express"
const app = express()
import morgan from "morgan"


import connectDB from "./config/dbConn"
import mongoose from "mongoose"
import session from "express-session"
import passport from "passport"
import MongoStore from "connect-mongo"
import * as Signup from "./routes/signup";
import * as Login from "./routes/login"




const PORT = process.env.DB_PORT || 3500
connectDB();

// built-in middleware for json 
app.use(express.json())

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

//middleware for logging
app.use(morgan('dev'))

//express sessions
app.use(session({
    secret: 'beatstashsessions',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
    // store: new MongoStore({mongooseConnection:mongoose.connection})

}));

//passport middleware
app.use(passport.authenticate('session'))

app.use('/signup', Signup.router)


app.use('/login',Login.router)






mongoose.connection.once('open', (): void => {
    console.log('Connected to MongoDB')

    app.listen(PORT, (): void => console.log(`Server running on port ${PORT}`))
})