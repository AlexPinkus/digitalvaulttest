import mongoose from "mongoose";

const usersSchema =  new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    score: {
        type: Number,
        default:0,
    }

});

const users = mongoose.model('users', usersSchema);
export default users;