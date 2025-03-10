import { TaskManagerContext } from "@/context";
import { logoutApi } from "@/services";

import { LogOut } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const{setUser} = useContext(TaskManagerContext);
    const navigate = useNavigate();


  async function handleLogout() {
   const response = await logoutApi();
   if(response?.success){
      setUser(null);
      navigate("/auth");
   }
  }

  return (
    <header className="border-b border-gray-200 bg-gray-200">
      <div className="container mx-auto h-16">
        <div className="bg-gray-200 flex h-[64px] items-center w-full justify-between">
          <div className="w-auto">
            <h1 className="font-bold border rounded-lg p-3 bg-gray-100">Task Manager</h1>
          </div>
          <div className="flex gap-4">
            <Link className="text-black text-xl font-bold bg-gray-100 border rounded-lg p-3  " to={"/tasks/list"}>
              Tasks
            </Link>
            <Link
              className="text-black text-xl font-bold bg-gray-100 border rounded-lg p-3"
              to={"/tasks/scrum-board"}
            >
              Scrum Board
            </Link>
          </div>
          <div>
            <LogOut
              onClick={handleLogout}
              color="#000"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
