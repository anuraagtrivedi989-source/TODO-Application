const mongoose = require("mongoose")

const Task = require("./models/Task")

const DbConnection = async()=>{
    const DB_URL = process.env.MONGO_URI
    mongoose.connect(DB_URL)

    const db = mongoose.connection
     db.on("error", console.error.bind('Connection error'))
    db.once("open", function(){
          console.log("DB connected");
    })

}

module.exports = DbConnection