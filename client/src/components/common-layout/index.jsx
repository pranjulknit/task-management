import  { Outlet } from "react-router-dom";
import Header from "../header";

function CommonLayout(){
  return(
    <div className="flex flex-auto flex-col">
      <div className="flex flex-auto">
        <main className="flex flex-col min-h-screen min-w-0 w-full bg-white border-gray-300">
          <Header/>
          <div className="flex flex-auto flex-col justify-between">
            <div>

            </div>
          </div>
        </main>
      </div>
      <Outlet/>
    </div>
  )
}

export default CommonLayout;