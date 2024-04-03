import leaderboards from "../../models/leaderboards.js"
import createdleaderboards from "../../models/createdleaderboards.js"
const { Schema, model } = require('mongoose')
const mongoose = require("mongoose");
const createLeaderboards = async (req, res) => {
    const body  =  req.body;
    try {
        if (!body.name ){
            let message = "Body error: Leaderboards's name is Mandatory";
            res.status(500).json({ 
                ok: false,
                message: message 
            });
            return
        }
        
        const schema = new mongoose.Schema(leaderboards)
        await createdleaderboards.create({name: body.name});
        let selectedBoaard;
        try {
            selectedBoaard = mongoose.model(body.name);
        } catch (error) {
            selectedBoaard = mongoose.model(body.name, schema);
        }
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

const addUserToLeaderboard = async (req, res) => {
    const body  =  req.body;
    try {
        if (!body.idLeaderboard || !body.idUser ){
            let message = "Body error: ";
            message = !body.idLeaderboard ? message + "Leaderboards's id is Mandatory " : message;
            message = !body.idUser ? message + "Users' id is Mandatory " : message;
            res.status(500).json({ 
                ok: false,
                message: message 
            });
            return
        }
        const leaderboardName = await createdleaderboards.findById(body.idLeaderboard);
        let selectedBoaard;
        try {
            selectedBoaard = mongoose.model(leaderboardName.name);
        } catch (error) {
            res.status(500).json({ 
                ok: false,
                message: "Leaderboard not found or not register" 
            });
        }
        selectedBoaard.create({owner: body.idUser, score: 0})
        res.status(200).json({
            ok: true,
            message: "user added"
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            message: error.message 
        });
    }
}

const updateUserScore = async (req, res) => {
    const body  =  req.body;
    try {
        if (!body.idLeaderboard || !body.idUser || !body.score ){
            let message = "Body error: ";
            message = !body.idLeaderboard ? message + "Leaderboards's id is Mandatory " : message;
            message = !body.idUser ? message + "Users' id is Mandatory " : message;
            message = !body.idUser ? message + "Users' points erned/lose are Mandatory " : message;
            res.status(500).json({ 
                ok: false,
                message: message 
            });
            return
        }
        const leaderboardName = await createdleaderboards.findById(body.idLeaderboard);
        let selectedBoaard;
        try {
            selectedBoaard = mongoose.model(leaderboardName.name);
        } catch (error) {
            res.status(500).json({ 
                ok: false,
                message: "Leaderboard not found or not register" 
            });
        }
        const userScore = await selectedBoaard.findOne({owner: body.idUser})
        userScore.score += body.score
        await userScore.save()
        res.status(200).json({
            ok: true,
            message: "user's score updated"
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            message: error.message 
        });
    }
}

const getLeaderboard = async (req, res) => {
    const bdoy  =  req.params;
    try {
        if (!body.idLeaderboard || !body.size || !body.page ){
            let message = "Body error: ";
            message = !body.idLeaderboard ? message + "Leaderboards's id is Mandatory " : message;
            message = !body.size ? message + "page size is Mandatory " : message;
            message = !body.page ? message + "page number is Mandatory " : message;
            res.status(500).json({ 
                ok: false,
                message: message 
            });
            return
        }
        if (body.size < 1 || body.page < 1){
            let message = "Body error: ";
            message = !body.size ? message + "page size cannot be less than 1 " : message;
            message = !body.page ? message + "page number starts on page 1" : message;
            res.status(500).json({ 
                ok: false,
                message: message 
            });
            return

        }
        const skip = body.size*(body.page-1)
        const leaderboardName = await createdleaderboards.findById(body.idLeaderboard)
        let selectedBoaard;
        try {
            selectedBoaard = mongoose.model(leaderboardName.name);
        } catch (error) {
            res.status(500).json({ 
                ok: false,
                message: "Leaderboard not found or not register" 
            });
        }
        const userScore = await selectedBoaard.findOne({owner: body.idUser}).limit(body.size)
        .skip(skip)
        .populate({path: 'owner', select: 'name'});
        userScore.score += body.score
        await userScore.save()
        res.status(200).json({
            ok: true,
            message: "user's score updated"
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            message: error.message 
        });
    }
}

const getUserRank = async (req, res) => {
    const bdoy  =  req.params;
    try {
        if (!body.idLeaderboard || !body.idUser ){
            let message = "Body error: ";
            message = !body.idLeaderboard ? message + "Leaderboards's id is Mandatory " : message;
            message = !body.idUser ? message + "idUser is Mandatory " : message;
            res.status(500).json({ 
                ok: false,
                message: message 
            });
            return
        }
        const leaderboardName = await createdleaderboards.findById(body.idLeaderboard)
        let selectedBoaard;
        try {
            selectedBoaard = mongoose.model(leaderboardName.name);
        } catch (error) {
            res.status(500).json({ 
                ok: false,
                message: "Leaderboard not found or not register" 
            });
        }
        const userScore = await selectedBoaard.aggregate([
            // Filtrar los documentos que coincidan con el criterio
            { $match: { owner: body.idUser } },
            // Ordenando los archivos para obtener un raking de menor a mayor.
            { $sort: { score: 1 } },
            // Agregar un campo 'index' que contenga el índice del documento
            { $group: { _id: null, index: { $push: "$$ROOT" } } },
        ]).populate({path: 'owner', select: 'name'})
        res.status(200).json({
            ok: true,
            data: userScore,
            message: "user's score updated"
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            message: error.message 
        });
    }
}

const getUserNearestRank = async (req, res) => {
    const bdoy  =  req.params;
    try {
        if (!body.idLeaderboard || !body.idUser  || !body.size ){
            let message = "Body error: ";
            message = !body.idLeaderboard ? message + "Leaderboards's id is Mandatory " : message;
            message = !body.idUser ? message + "idUser is Mandatory " : message;
            message = !body.size ? message + "size is Mandatory " : message;
            res.status(500).json({ 
                ok: false,
                message: message 
            });
            return
        }
        const leaderboardName = await createdleaderboards.findById(body.idLeaderboard)
        let selectedBoaard;
        try {
            selectedBoaard = mongoose.model(leaderboardName.name);
        } catch (error) {
            res.status(500).json({ 
                ok: false,
                message: "Leaderboard not found or not register" 
            });
        }
        const userScore = await selectedBoaard.aggregate([
            // Filtrar los documentos que coincidan con el criterio
            { $match: { owner: body.idUser } },
            // Ordenando los archivos para obtener un raking de menor a mayor.
            { $sort: { score: 1 } },
            // Agregar un campo 'index' que contenga el índice del documento
            { $group: { _id: null, index: { $push: "$$ROOT" } } },
            // Proyectar solo el campo 'index'
            { $project: { _id: 0, index: 1 } }
        ])
        const skip = userScore[0].index[0] > body.size/2 ? userScore[0].index[0] - body.size/2 : 0 ;
        const nearUsers = await selectedBoaard.find({}).limit(body.size)
        .skip(skip)
        .populate({path: 'owner', select: 'name'});
        res.status(200).json({
            ok: true,
            data: nearUsers,
            message: "user's score updated"
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            message: error.message 
        });
    }
}
const deleteLeaderboard = async (req, res) => {
    const body  =  req.body;
    try {
        if (!body.idLeaderboard ){
            let message = "Body error: Leaderboards's id is Mandatory";
            res.status(500).json({ 
                ok: false,
                message: message 
            });
            return
        }
        schema[body.nombre] = leaderboards;
        const deletedItem = await createdleaderboards.deleteOne({ _id: body.idLeaderboard });
        const schema = new mongoose.Schema(leaderboards)
        let selectedBoaard;
        try {
            selectedBoaard = mongoose.model(deletedItem.name);
            await selectedBoaard.collection.drop();
        } catch (error) {/** coletion already no exist*/}
        res.status(200).json({
            ok: true,
            message: "Leaderboard deleted"
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            message: error.message 
        });
    }
}


export {createLeaderboards,addUserToLeaderboard,updateUserScore,deleteLeaderboard,getLeaderboard,getUserRank,getUserNearestRank};