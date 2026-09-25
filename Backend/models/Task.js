const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    id:Number,
    title:String,
    description:String,
    creationDate:String,
    creationTime:String,
    completed:Boolean
});

const Task = mongoose.model("Task", taskSchema)

module.exports = Task