import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import { errorHandler } from "./middleware/error.middleware.js"
import "dotenv/config"

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true //bcoz we are using cookies
}))
const PORT = process.env.PORT

app.use(cookieParser())
app.use(express.json())
app.use("/api", userRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})