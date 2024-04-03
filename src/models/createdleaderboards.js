import mongoose from "mongoose";

const leaderboardsSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cative:{
        type: Boolean,
        default: true
    },
});

const leaderboards = mongoose.model('leaderboards', leaderboardsSchema);
export default leaderboards;