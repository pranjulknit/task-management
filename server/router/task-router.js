


const express = require("express");
const { addNewTask, getAllTask, deleteTask, updateTask } = require("../controllers/task-controller");
const middilecheck = require("../middilware/middilecheck");

const taskRouter  = express.Router();

taskRouter.post("/add-new-task",addNewTask);
taskRouter.get("/get-all-tasks/:id",getAllTask);
taskRouter.delete("/delete-task/:id",deleteTask);
taskRouter.put("/update-task",updateTask);

module.exports = taskRouter;