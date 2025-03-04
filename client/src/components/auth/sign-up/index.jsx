import CommonForm from "@/components/common-form"
import { useToast } from "@/components/ui/use-toast";
import { signUpFormControls } from "@/config";

import { registerApi } from "@/services";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

function SignUp(){
  const formData = useForm({
    defaultValues:{
     
      email:"",
      password:""
    }
  })

  const {toast} = useToast();
  const navigate = useNavigate();
  async function handleSubmit(sendData){
      console.log(sendData);
      const data = await registerApi(sendData)

      console.log(data);

      if(data?.success){
        toast({
          title:"Success",
          description:"Welcome"
        })
        toast({
          title:"Success",
          description:"Going to tasks list"
        })
        navigate("/tasks/list")
      }else{
        toast({
          title:"Error",
          description:"Some Error Occured"
        })
      }
      
  }
  return(
    <div>
   
     <CommonForm form={formData}
     formControls={signUpFormControls} handleSubmit={handleSubmit} butnText={"Sign Up"}/>
    </div>

  )
}

export default SignUp