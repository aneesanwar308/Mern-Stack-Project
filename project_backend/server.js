const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors");

const userRouter = require("./router/user_router")

mongoose.connect("mongodb://localhost:27017/project", () => {
    console.log("connected with database")
})
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use("/api", userRouter)

app.listen(8000, () => {
    console.log("this server is running on port no 8000")
})
