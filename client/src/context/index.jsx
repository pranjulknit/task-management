import { userAuth } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const TaskManagerContext = createContext(null);

function TaskManagerProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const taskFormData = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();
  //    useEffect(()=>{
  //          console.log("user",user)
  //    },[user])
  useEffect(() => {
    const verifyUserCookie = async () => {
      const data = await userAuth();

      if (data?.userinfo) {
        console.log(data.userinfo, "verifyUserCookie1");
        setUser(data?.userinfo);
      }

      return data?.success
        ? navigate(
            location.pathname === "/auth" || location.pathname === "/"
              ? "/tasks/list"
              : `${location.pathname}`
          )
        : navigate("/auth");
    };

    verifyUserCookie();
  }, [navigate, location.pathname]);

  return (
    <TaskManagerContext.Provider
      value={{
        tasksList,
        setTasksList,
        setLoading,
        loading,
        user,
        setUser,
        taskFormData,
        currentEditedId,
        setCurrentEditedId,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
}

export default TaskManagerProvider;
