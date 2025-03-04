import CommonButton from "@/components/common-button";
import CommonCard from "@/components/common-card";
import { scrumBoardOptions } from "@/config";

function TaskItem({
  item,
  handleDelete
}) {
  return (
    <CommonCard
    title={item?.title}
    description={item?.status}
    footerContent={
    <div className="flex w-full justify-between items-center">
      <CommonButton buttonText={"Edit"}/>
      <CommonButton onClick={()=>handleDelete(item?._id)} buttonText={"Delete"}/>
      

    </div>
    }
    />
     
  );
}

export default TaskItem;
