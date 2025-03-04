import CommonButton from "@/components/common-button";
import AddNewTask from "@/components/tasks/add-new-task";
import { TaskManagerContext } from "@/context";
import { addNewTaskApi, getAllTasksApi } from "@/services";
import { useContext, useEffect, useState } from "react";

function TaskPage() {
  const [showDialog, setShowDialog] = useState(false);
  const { tasksList, setTasksList, setLoading, loading, user, taskFormData } =
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
  useEffect(() => {
    if (user !== null) fetchListOfTasks();
  }, [user]);

  async function handleSubmit(getData) {
    console.log(user);
    const response = await addNewTaskApi({
      ...getData,
      userId: user?._id,
    });
    if (response) {
      setShowDialog(false);
      taskFormData.reset();
      fetchListOfTasks();
    }
    console.log(response);
  }

  console.log(tasksList);
  return (
    <>
      <div className="mb-5">
        <CommonButton
          onClick={() => setShowDialog(true)}
          buttonText={"Add New Task"}
        />
      </div>
      <div className="mt-5 flex flex-col">
        <div>List Of Tasks</div>
        <AddNewTask
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          handleSubmit={handleSubmit}
          taskFormData={taskFormData}
        />
      </div>
    </>
  );
}

export default TaskPage;
