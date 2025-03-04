


const express = require("express");
const { addNewTask, getAllTask } = require("../controllers/task-controller");
const middilecheck = require("../middilware/middilecheck");

const taskRouter  = express.Router();

taskRouter.post("/add-new-task",addNewTask);
taskRouter.get("/get-all-tasks/:id",getAllTask);

module.exports = taskRouter;