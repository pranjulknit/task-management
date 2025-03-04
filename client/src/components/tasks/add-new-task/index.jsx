import CommonDialog from "@/components/common-dialog";
import { addNewTaskFormControls } from "@/config";

import { TaskManagerContext } from "@/context";
import { addNewTaskApi } from "@/services";
import { useContext } from "react";

function AddNewTask({
  showDialog,
  setShowDialog,
 handleSubmit,taskFormData
 
 

}) {

   
   
  return (
    <CommonDialog
      formControls={addNewTaskFormControls}
      showDialog={showDialog}
      
      title={ "Post New Task"}
      btnText={"Add Task"}
      handleSubmit={handleSubmit}
      formData={taskFormData}
    />
  );
}

export default AddNewTask;
