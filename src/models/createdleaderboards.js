import mongoose from "mongoose";

const leaderboardsSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        default: true
    },
});

const leaderboards = mongoose.model('leaderboards', leaderboardsSchema);
export default leaderboards;
