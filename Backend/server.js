const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })

const express = require("express")
const Task = require("./models/Task")
const taskRoutes = require("./routes/routes")
const cors = require("cors")


const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_URL
  ].filter(Boolean)
}));

const DbConnection =  require("./dbConnection")
DbConnection()
app.use(express.json())


app.use("/api/tasks", taskRoutes)

app.listen("3000",()=>{
    console.log("Server is running at http://localhost:3000")
})