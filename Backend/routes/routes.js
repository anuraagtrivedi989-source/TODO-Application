const express = require("express")

const router = express.Router();
const Task = require("../models/Task")


// get all tasks

router.post("/add",async(req,res)=>{
   try{
    const task = new Task(req.body)

    if(!task){
        res.status(400).json({
           message: "task is required"
        })
    }
    // console.log("Body", req.body)
    

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
} )

router.get("/task",async(req, res)=>{
    try{
       const tasks = await Task.find()

       if(!tasks){
        res.status(400).json({
            message:"task not found"
        })
       }
       res.status(200).json({
        tasks
       })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"server error"
        })
    }   
})

// Update 
router.put("/:id", async(req, res)=>{
    try{
        // const id = Number(req.params.id)

        const updatedTask = await Task.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {new :true}
        );

        if(!updatedTask){
            return res.status(404).json({
                success:false,
                message:"cannot find the task",

            });
        }  
        
        res.status(200).json({
            success:true,
            data:updatedTask
        });
    }catch(error){
        res.status(500).json({
            message:"server error"
        })
    }
})

//  delete a task

router.delete("/:id", async(req, res)=>{
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
            message:"task deleted sucessfully"
        })
     
    }catch(error){
      res.status(500).json({
        success:false,
        message:"server error"
      });
    }
})

module.exports = router