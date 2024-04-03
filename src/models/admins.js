import mongoose from "mongoose";

const adminsSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});

const admins = mongoose.model('admins', adminsSchema);
export default admins;