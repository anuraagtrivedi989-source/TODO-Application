const express = require("express")
// const tasks = require("./data/task.json")
const Task = require("./models/Task")
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const DbConnection =  require("./dbConnection")
DbConnection()
app.use(express.json())



// After using mongodb

//  to add new task
app.post("/tasks", async(req,res)=>{
   try{
    // console.log("Body", req.body)
    const task = new Task(req.body)

    const savedTask = await task.save();
    res.status(201).json({
        success:true,
        data :savedTask
    })
    // console.log(savedTask)
   }catch(error){

    // console.log("posterror", error)
    res.status(500).json({
        success:false,
       message:"server error"
    })
}
})
// search by value
app.get("/tasks/search", async(req, res)=>{
    try{
        console.log("hit the route")
        const value = req.query.value;
        console.log(value)
        const taskFound = await Task.find({
            title:{
               $regex: new RegExp(value, "i")
            },
            completed:true
        })
        console.log(taskFound)

        if(taskFound.length===0){
            return res.status(404).json({
                message: "task not found"
            })
        }

        res.status(200).json({
            success:true,
            data: taskFound
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"server error"
        })
    }
    

    
})
// Search all tasks 
app.get("/tasks", async(req,res)=>{
    try{
        const tasks = await Task.find()

        res.status(200).json({
            success:true,
            data:tasks
        })
    }catch(error){
        res.status(500).json({
            message:"cannont find the task"
        });
    }
});



// seearch by id
app.get("/tasks/:id", async(req, res)=>{
    try{
        // const id = Number(req.params.id)
        const task = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({
                success:false,
                message:"connot found the task"
            });
        }
        res.status(200).json({
            success:true,
            data:task
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"server error"
        });
    }
});

app.put("/tasks/:id", async(req, res)=>{
    try{
        const id = Number(req.params.id)
       

        const updatedTask= await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {returnDocument:"after"}
        )
        if(!updatedTask){
            return res.status(404).json({
                success:false,
                message:"cannot update task"
            });
        }
        res.status(200).json({
            success:true,
            data: updatedTask
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"server error"
        });
    }
})

// to update the task
app.patch("tasks/:id",  async(req, res)=>{
    try{
        const id = Number(req.params.id)

        const updatedTask = await Task.findOneAndUpdate(
            {id:id},
            req.body,
            {new :true}
        )

        if(!updatedTask){
            return res.status(404).json({
                success:false,
                message:"cannot find the task",

            });
        }  
        
        res.status(200).json({
            success:true,
            data:updatedTask
        })
    }catch(error){
        res.status(500).json({
            message:"server error"
        })
    }
});
//  delete a task by id
app.delete("/tasks/:id", async(req, res)=>{
    try{
    //  const id = Number(req.params.id)

     const deletedTask = await Task.findByIdAndDelete(req.params.id);
     if(!deletedTask){
        return res.status(404).json({
            message:" cannot delete the task "
        })
     }
     res.status(200).json({
            success:true,
            data:deletedTask
        })
     
    }catch(error){
      res.status(500).json({
        success:false,
        message:"server error"
      });
    }
});




app.listen("3000",()=>{
    console.log("Server is running at http://localhost:3000")
})