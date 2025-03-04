


// add a new task

const Task = require("../models/task");


// get all task

// delete a task

//edit a task


const addNewTask =  async(req,res)=>{
    const {title,description,status,userId} = await req.body;


    //validate the schema
     
    try {

        const newTask = await Task.create({
            title,
            description,
            status,
            userId
        })
           
        if (newTask) {
            console.log("newTask",newTask);
            return res.status(201).json({
              success: true,
              message: "Task added successfully",
            });
        }
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success : false,
            message : "Some error occured"
        })
    }
}

const getAllTask = async(req,res)=>{
     
    const id = req.params.id;
    

    const allusersbyId = await Task.find({userId:id});
   
    if(allusersbyId){
        console.log("backedn id",allusersbyId); 
        return res.status(200).json({
            success:true,
           allusersbyId
        })
    }
    else{
        return res.status(404).json({
            success:false,
            message:"No task found"
        })
    }
    
}
const updateTask = async(req,res)=>{
   const {title,description,status,priority,userId,_id} = await req.body;

   try{
    const updateTask = await Task.findByIdAndUpdate({
        _id
    },{
        title,description,status,priority,userId
    },{new:true});

    if(updateTask){
        return res.status(200).json({
            success:true,
           message:"Task updated successfully"
        })
    }
    else{
        return res.status(500).json({
            success : false,
            message : "Some error occured! Please try again"
        })
    }
}catch(e){
    
    return res.status(500).json({
        success : false,
        message : "Some error occured"
    })
   }

}
const deleteTask = async(req,res)=>{
    const id = req.params.id;

    try {

        if(!id){
            return res.status(400).json({
                success:false,
                message:"id is required"
            })
        }
        const deleteTask = await Task.findByIdAndDelete(id);

        if(deleteTask){
            return res.status(200).json({
                success:true,
                message:"Task deleted successfully"
        })
    }
        else{
            return res.status(500).json({
                success : false,
                message : "Some error occured"
            })
        }
        
    }catch(e){
        console.log(e);

        return res.status(400).json({
            success : false,
            message : "Some error occured"
        })
    }
}


module.exports = {
    addNewTask,
    getAllTask,
    deleteTask,
    updateTask
}