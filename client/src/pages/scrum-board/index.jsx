import CommonCard from "@/components/common-card";
import { scrumBoardOptions } from "@/config";
import { TaskManagerContext } from "@/context";
import { getAllTasksApi, updateTaskApi } from "@/services";

import { useContext, useEffect } from "react";

function ScrumBoardPage() {
  const { user, tasksList, setTasksList, setLoading } =
    useContext(TaskManagerContext);
    
    async function updateTaskByStatus(getTask) {
        await updateTaskApi(getTask);
        await fetchListOfTasks();
    }


    function onDrop(event,getCurrentStatus){
       const draggedTaskId = event.dataTransfer.getData("id");

       let findCurrenttask = tasksList.find(item=>item._id.toString() === draggedTaskId);

       findCurrenttask ={
        ...findCurrenttask,
        status:getCurrentStatus
       }

       updateTaskByStatus(findCurrenttask);
    }

    function onDragStart(event,taskId){
        event.dataTransfer.setData("id",taskId);
    }
  // can be use a hook to get the user
  async function fetchListOfTasks() {
    console.log(user, "user hai");

    const response = await getAllTasksApi(user?._id);
    if (response?.success) {
      console.log(response);
      setTasksList(response?.allusersbyId);
    }
  }



  useEffect(() => {
    if (user !== null) fetchListOfTasks();
  }, [user]);

  function renderTasksbyStatus() {
    const taskStatus = {
      todo: [],
      inProgress: [],
      blocked: [],
      review: [],
      done: [],
    };
    tasksList.forEach((taskItem) => {
      taskStatus[taskItem.status].push(
        <div
         onDragStart={
            taskItem.status !== "done"? (event)=>onDragStart(event,taskItem._id):null
         }
         className="mb-3"
         draggable={
            taskItem?.status !== "done" ? true:false
         }
        >
          <CommonCard extraTextStyles={taskItem.status === "done" ? "line-through":""} title={taskItem?.title} description={scrumBoardOptions.find(boardOption=> boardOption.id === taskItem?.status).label} />
        </div>
      );
    });

    return taskStatus;
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-2 h-full">
        {scrumBoardOptions.map((item) => (
          <div
            key={item.id}
            onDrop={(event) => onDrop(event, item.id)}
            onDragOver={(event) => event.preventDefault()}
            className="border border-[#333333] rounded overflow-auto "
          >
            <div className="px-1 py-3 text-center bg-black border-none mb-3 ">
              <h3 className="text-2xl font-extrabold text-white">
                {item.label}
              </h3>
            </div>

            <div>{renderTasksbyStatus()[item.id]}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ScrumBoardPage;
