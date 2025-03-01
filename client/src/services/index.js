import axios from "axios";


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


