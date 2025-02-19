import CommonForm from "@/components/common-form"
import { signupformControls } from "@/config"
import { useForm } from "react-hook-form"

function SignUp(){
  const formData = useForm({
    defaultValues:{
     
      email:"",
      password:""
    }
  })

  function handleSubmit(){

  }
  return(
    <div>
   
     <CommonForm form={formData}
     formControls={signupformControls} handleSubmit={handleSubmit} butnText={"Sign Up"}/>
    </div>

  )
}

export default SignUp