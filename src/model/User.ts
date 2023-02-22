import mongoose from "mongoose";
const { Schema } = mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
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
        Lisener: {
            type: String,
            default: 'listener'
        },
        Producer: String,
        required: true
    }

})

export default mongoose.model('User', UserSchema);