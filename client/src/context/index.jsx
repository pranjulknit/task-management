import { userAuth } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const TaskManagerContext = createContext(null);


function TaskManagerProvider({children}){
     const [user,setUser] = useState(null);

     const navigate = useNavigate();
     const location  = useLocation();

     useEffect(()=>{
            const verifyCookie = async()=>{
                const data = await userAuth();
                 console.log("data from context",data);
                if(data.userInfo){
                    setUser(data.userInfo);
                }
                
               return data?.success ? navigate(location.pathname === "/auth" || location.pathname ==="/"?"/tasks/list":`${location.pathname}`):navigate("/auth")
            }
            verifyCookie();

     },[navigate,location.pathname])

    return <TaskManagerContext.Provider value={{user,setUser}}>
        {children}
    </TaskManagerContext.Provider>

}

export default TaskManagerProvider;
