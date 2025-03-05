import { scrumBoardOptions } from "@/config";
import { TaskManagerContext } from "@/context";
import { useContext, useEffect } from "react";

function ScrumBoardPage(){
    
    const {user,tasksList,setTasksList} = useContext(TaskManagerContext);

    // can be use a hook to get the user
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
    useEffect(()=>{
        if(user !== null)
      fetchListOfTasks()      
    },[user])
    return <>
        <div className="grid grid-cols-5 gap-2 h-full">
            {
                scrumBoardOptions.map(item => <div key={item.id} className="border border-[#333333] rounded overflow-auto "> 

                    <div className="px-1 py-3 text-center bg-black border-none mb-3 ">
                        <h3 className="text-2xl font-extrabold text-white">
                            {item.label}
                        </h3>
                    </div>

                    <div>
                        {
                            renderTodoStatus
                        }
                    </div>

                </div> )
            }
        </div>
    </>
}

export default ScrumBoardPage;