//these leaderboards are created dynamically to reduce quantity of information that the mongoDB engin has to move in each consult
 //this way macking a faster data proses
const leaderboards = 
    { 
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            unique: true 
        },
        score: {
            type: Number,
            default:0,
        } 
    };

module.exports = leaderboards;