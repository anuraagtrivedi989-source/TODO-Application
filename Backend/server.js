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

const dotenv = require("dotenv")
dotenv.config();
const DbConnection =  require("./dbConnection")
DbConnection()
app.use(express.json())


app.use("api/tasks", taskRoutes)






app.listen("3000",()=>{
    console.log("Server is running at http://localhost:3000")
})