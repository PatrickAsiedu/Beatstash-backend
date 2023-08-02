import mongoose from "mongoose";
const { Schema } = mongoose





interface User {
    email: string;
    fitstname: string;
    lastname: string;
    username: string;
    password: string;

}



const UserSchema = new Schema({
    email: {
        type: String,
        unique:true,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String,
    },
    username: String,
    password: {
        type: String,
        required: true
    },
    roles: {
        Listener: {
            type: Number,
            default: 2000
        },
        Producer: Number,
        // required: true
    }
  

},   { timestamps:true })

const User= mongoose.model('User', UserSchema)

export default User ;