


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

}
const deleteTask = async(req,res)=>{

}


module.exports = {
    addNewTask,
    getAllTask
}