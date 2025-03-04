import axios, { formToJSON } from "axios";


export const registerApi = async (formData) => {
    try {
        console.log("formdata at services",typeof(formData))
        const response = await axios.post("http://localhost:5000/api/user/register", formData, { withCredentials: true });
        console.log("response data from services",response.data);
        return response?.data;  
    } catch (error) {
        console.error("Error during registration:", error);
        // You can return an error message or handle it as needed
        
    }
};

export const loginApi = async(formData)=>{
    try{
      const response = await axios.post("http://localhost:5000/api/user/login",formData,{withCredentials:true});
      return response?.data;
    }catch(e){
        console.error("Error during login:", e);
    }
}


export const userAuth = async()=>{
    const response = await axios.post("http://localhost:5000/api/user/auth",{},{withCredentials:true});
    return response?.data;
}


export const logoutApi = async()=>{
     const response = await axios.post("http://localhost:5000/api/user/logout",{},{withCredentials:true});

     return  response?.data;

}

export const addNewTaskApi = async(formData)=>{
    console.log("addnew data",formData)
    const response = await axios.post("http://localhost:5000/api/tasks/add-new-task",formData,{withCredentials:true});
    //  console.log("response from addnewtask",response?.data);
    return response?.data;
}
export const getAllTasksApi = async(getCurrentUserId)=>{
    // console.log(getCurrentUserId,"getcurrentuserid")
    const response  = await  axios.get(`http://localhost:5000/api/tasks/get-all-tasks/${getCurrentUserId}`)
    // console.log(response?.data,"response from getalltasks")
    return response?.data;
}
export const updateTaskApi = async(formData)=>{

}
export const deleteTaskApi = async(formData)=>{

}