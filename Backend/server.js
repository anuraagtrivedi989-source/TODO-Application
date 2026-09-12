const express = require("express")
const tasks = require("./data/task.json")
const app = express();

app.use(express.json())
//  To post a task 
app.post("/tasks",(req, res)=>{
    const newTask = {
        id:tasks.length+1,
        title:req.body.title,
        date:req.body.date,
        completed:true,

    }
    tasks.push(newTask)

    res.status(201).json({
        message:"task created successfully",
        task:newTask
    });
});

// to get all the tasks

app.get("/tasks", (req, res)=>{
   if(tasks.length===0){
    return res.status(404).json({
        success:false,
        message:"no task is available"
    });
   }
   res.status(200).json({
    message:"got all tasks",
    data:tasks
   })
})
// Search a task by value
app.get("/tasks/search", (req, res)=>{
    const value = req.query.value
    console.log(value)

    const taskFound = tasks.filter((task)=>{
        return task.title.toLowerCase().includes(value.toLowerCase())
    })
    if(taskFound.length===0){
        return res.status(404).json({
            message:"task not found"
        })
    }
  
    res.status(200).json({
        data:taskFound
    })

})
// get tasks by id
app.get("/tasks/:id",(req, res)=>{
    const id = Number(req.params.id);
    const task = tasks.filter((each)=> each.id===id)
   
    if(!task){
       return res.status(404).json({
            message: "no task found by this id"
        })
    }
    // res.status(200).json({
    //     success:true,
    //     data:task
    // })
    res.status(200).json({
        success:true,
        data:task
    })

})
app.use(express.json())
//  update task using the id
app.put("/tasks/:id", (req, res)=>{
    console.log("put route hit")
    
    const id= Number(req.params.id);
    const task = tasks.find(task=> task.id ===id);
    
    
    if(!task){
        return res.status(404).json({
            message:"no task found with this id"
        });
    }
    task.title = req.body.title
    task.completed=req.body.completed
   
    res.status(200).json({
         data:task
    })
    
})

// to mark the task as completed or incomplete
app.patch("/tasks/:id", (req, res)=>{
    const id = Number(req.params.id)
    const task = tasks.find((task)=>task.id===id)

    if(!task){
        return res.status(404).json({
            message: "no task found with this id"
        })
    }
    if(req.body.completed!==undefined){
        task.completed= req.body.completed
    }
    res.status(200).json({
        success:true,
        data:task
    })
})
// delete a specific task
app.delete("/tasks/:id", (req, res)=>{
    const id= Number(req.params.id)
    const taskIndx = tasks.findIndex(task=> task.id==id)


    if(taskIndx===-1){
        return res.status(404).json({
            message:"cannont found task with this id to delete"
        })
    }
    const deletedTask = tasks.splice(taskIndx,1)
    res.status(200).json({
        success:true,
        data:deletedTask[0]
})
})



app.listen("3000",()=>{
    console.log("Server is running at http://localhost:3000")
})