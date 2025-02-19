import CommonForm from "@/components/common-form"
import { signinFormControls } from "@/config"
import { useForm } from "react-hook-form"
function SignIn(){
  const formData = useForm({
      defaultValues:{
        name:"",
        email:"",
        password:""
      }
    })

    function handleSubmit(){

    }
  return(
    <div>
      <CommonForm butnText={"Signin" } form={formData} formControls={signinFormControls}handleSubmit={handleSubmit}/>
    </div>

  )
}

export default SignIn