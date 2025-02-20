import CommonForm from "@/components/common-form"
import { signupformControls } from "@/config"
import { registerApi } from "@/services";
import { useForm } from "react-hook-form"

function SignUp(){
  const formData = useForm({
    defaultValues:{
     
      email:"",
      password:""
    }
  })

  async function handleSubmit(sendData){
      console.log(sendData);
      const data = await registerApi(sendData)

      console.log(data);
      
  }
  return(
    <div>
   
     <CommonForm form={formData}
     formControls={signupformControls} handleSubmit={handleSubmit} butnText={"Sign Up"}/>
    </div>

  )
}

export default SignUp