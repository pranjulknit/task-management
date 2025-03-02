


// add a new task

const Task = require("../models/task");


// get all task

// delete a task

//edit a task


const addNewTask =  async(req,res)=>{
    const {title,description,status,userId} = await req.body;


    //validate the schema
     
    try {

        const newTask = Task.create({
            title,
            description,
            status,
            userId
        })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success : false,
            message : "Some error occured"
        })
    }
}

const getAllTask = async(req,res)=>{

    const {id} = req.params;

    const allusersbyId = await Task.find({userId:id});

    if(allusersbyId){
        return res.status(200).json({
            success:true,
            allusersbyId
        })
    }
    
}
const updateTask = async(req,res)=>{

}
const deleteTask = async(req,res)=>{

}
