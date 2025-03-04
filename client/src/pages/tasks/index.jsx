import CommonButton from "@/components/common-button";
import AddNewTask from "@/components/tasks/add-new-task";
import TaskItem from "@/components/tasks/task-item";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskManagerContext } from "@/context";
import { addNewTaskApi, deleteTaskApi, getAllTasksApi, updateTaskApi } from "@/services";
import { useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

function TaskPage() {
  const [showDialog, setShowDialog] = useState(false);
  const { tasksList, setTasksList, setLoading, loading, user, taskFormData,currentEditedId,
    setCurrentEditedId } =
    useContext(TaskManagerContext);
  async function fetchListOfTasks() {
    console.log(user, "user hai");
    setLoading(true);
    const response = await getAllTasksApi(user?._id);
    if (response?.success) {
      console.log(response);
      setTasksList(response?.allusersbyId);
      setLoading(false);
    }
  }

  async function handleDelete (getTaskId){
        console.log(getTaskId);
        const response = await deleteTaskApi(getTaskId);
        if(response?.success){
            fetchListOfTasks();
        }
  }

  useEffect(() => {
    if (user !== null) fetchListOfTasks();
  }, [user]);

  async function handleSubmit(getData) {


    console.log(user);
    const response =  currentEditedId !== null ? await updateTaskApi({
        ...getData,
        _id:currentEditedId,
        userId: user?._id,
    }) :await addNewTaskApi({
      ...getData,
      userId: user?._id,
    });
    if (response) {
      setShowDialog(false);
      taskFormData.reset();
      fetchListOfTasks();
      setCurrentEditedId(null);
    }
    console.log(response);
  }



  console.log(tasksList);
  if(loading) return <Skeleton className={'w-full h-[550px] rounded-[6px] bg-black opacity-50' }/>
  return (
    <>
      <div className="mb-5">
        <CommonButton
          onClick={() => setShowDialog(true)}
          buttonText={"Add New Task"}
        />
      </div>
      <div className="mt-5 flex flex-col">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{
             tasksList?.length > 0?
              tasksList.map(taskItem=>  <TaskItem taskFormData={taskFormData}setCurrentEditedId={setCurrentEditedId} setShowDialog={setShowDialog} item={taskItem} handleDelete={handleDelete} />)
             : <h1>No Tasks Added</h1>
            
            }

        </div>
        <AddNewTask
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          handleSubmit={handleSubmit}
          taskFormData={taskFormData}
          currentEditedId={currentEditedId}
          setCurrentEditedId={setCurrentEditedId }
        />
      </div>
    </>
  );
}

export default TaskPage;
