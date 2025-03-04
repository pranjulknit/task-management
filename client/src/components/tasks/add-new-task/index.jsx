import CommonDialog from "@/components/common-dialog";
import { addNewTaskFormControls } from "@/config";

function AddNewTask({
  showDialog,
  setShowDialog,
  handleSubmit,
  taskFormData,
  currentEditedId,
  setCurrentEditedId,
}) {
  return (
    <CommonDialog
      formControls={addNewTaskFormControls}
      onOpenChange={()=>{
        setShowDialog(false);
        currentEditedId ?taskFormData.reset():null;
        setCurrentEditedId(null);
      }}
      showDialog={showDialog}
      title={currentEditedId !== null ? "Edit Task" : "Post New Task"}
      btnText={currentEditedId !== null ? "Edit" : "Add"}
      handleSubmit={handleSubmit}
      formData={taskFormData}
    />
  );
}

export default AddNewTask;
