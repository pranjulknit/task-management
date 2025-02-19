import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { useState } from "react";
import CommonButton  from "@/components/common-button";

function AuthPage(){
    const [isLogin,setisLogin] = useState(false);
    return <div className="flex flex-auto flex-col min-h-screen h-full">
        <div className="flex  h-full flex-col justify-center items-center bg-white">
            <h3 className="text-3xl font-bold">Welcome</h3>
            <div className="mt-4">
                {
                    isLogin ? <SignIn/> : <SignUp/>
                }
            </div>

            <div className="mt-5">
            <CommonButton type={"button"}onClick={()=>setisLogin(!isLogin)} 
                buttonText={isLogin?"Switch to SignUp":"Switch to Signin"}>
                
            </CommonButton>
            </div>

            
        </div>
    </div>
}

export default AuthPage;