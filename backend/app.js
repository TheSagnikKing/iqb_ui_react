const express = require("express")
const connectDB = require("./db/db")
const cors = require("cors")

connectDB()

const app = express()

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json())

app.get("/",(req,res) => {
    res.send("new")
})

//Routes
const userRouter =  require("./routes/user")
app.use("/api",userRouter)

const PORT = 8000

app.listen(PORT,() => {
    console.log(`Server is running on PORT:${PORT}`)
})