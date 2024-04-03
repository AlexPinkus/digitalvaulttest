
import users from "../../models/users.js"
const createUser = async (req, res) => {
    const body  =  req.body;
    try {
        if (!body.name || !body.password || !body.email){
            let message = "Body error: "; 
            message = !body.name ? message+" User's name is Mandatory" : message;
            message = !body.email ? message+" User's email is Mandatory" : message;
            message = !body.password ? message+" User's password is Mandatory" : message;
            res.status(500).json({ 
                ok: false,
                message: message 
            });
            return
        }
        await users.create(body);
        res.status(200).json({
            ok: true,
            message: "Leaderboard Created"
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            message: error.message 
        });
    }
}

export {createUser};