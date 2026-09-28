const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    id:Number,
    title:String,
    description:String,
    createdAt:Date,
    completed:Boolean
},{
    timestamps:true
});

const Task = mongoose.model("Task", taskSchema)

module.exports = Task