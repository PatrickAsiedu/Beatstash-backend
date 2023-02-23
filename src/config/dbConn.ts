import mongoose from "mongoose"
// import dotenv from "dotenv"
// dotenv.config()

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(process.env.DB_URL)



    } catch (error) {
        console.error(error)

    }

}

export default connectDB