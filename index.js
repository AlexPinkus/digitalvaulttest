import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import bodyParser from "body-parser"
import cors from "cors"

import connectDB from "./config/mongodb.js"
import usersRoutes from "./src/routes/users/users.js"
import learboardsRoutes from './src/routes/leaderboards/leaderboards.js';

dotenv.config()
connectDB()

const PORT = process.env.PORT || 8080
const app = express()

const corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//-----APP ROUTES----------------------
app.use('/v1/users', usersRoutes);
app.use("/v1/leaderboards", learboardsRoutes)  

app.get("/", (req, res, next) => {
	res.status(200).json({
		ok: true,
		message: "Hello"
	})
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} 🚀`)
})
