import CommonForm from "@/components/common-form"
import { signInFormControls } from "@/config"

import { loginApi } from "@/services"

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
function SignIn(){
  const formData = useForm({
      defaultValues:{
        name:"",
        email:"",
        password:""
      }
    })

    const navigate = useNavigate();

    async function handleSubmit(getData){
  
    const data  = await loginApi(getData);
    if(data?.success){
      navigate("/tasks/list")
    }
    }
  return(
    <div>
      <CommonForm butnText={"Signin" } form={formData} formControls={signInFormControls}handleSubmit={handleSubmit}/>
    </div>

  )
}

export default SignIn