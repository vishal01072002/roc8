import { toast } from "react-toastify"
import {apiConnector} from "../apiConnector"
import {userEndpoints} from "../endPoint"
import { setLoading, setUserData} from "../../store/slices/userSlice";

// SIGNUP API
export const signup = (signupUpdated,navigate)=>{
    return async(dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        const response = await apiConnector("POST",userEndpoints.SIGNUP_API,signupUpdated);
          // console.log("SIGNUP API RESPONSE............", response);
  
          if(! response.data.success){
            throw new Error(response.data.message);
          }
  
          toast.success("Signup Successfully");
          navigate("/login");
      } catch (error) {
        // console.log("SIGNUP API ERROR............", error);
        toast.error(error.data.message);
        // console.log(error);
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }

  // LOGIN API
  export const login = (data,navigate) => {
    return async(dispatch)=>{    
      const toastId = toast.loading("Loading...");
      // const cookie = Cookies.get("token");
      
      try {
        const response = await apiConnector("POST",userEndpoints.LOGIN_API,data);
        console.log("LOGIN API RESPONSE \n", response);
        
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        
        toast.success("Login Successful");

        // set user info in profile slice
        dispatch(setUserData(response.data.user));
        navigate("/dataGraph");
        
      } catch (error) {
        console.log("LOGIN API ERROR............", error);
        toast.error(error.response.data.message);
      }
      
      toast.dismiss(toastId);
    }
  }
  
  export const test = () => {
    return async(dispatch)=>{    
      const toastId = toast.loading("Loading...");
      // const cookie = Cookies.get("token");
      
      try {
        const response = await apiConnector("POST",userEndpoints.TEST_DATA);
        console.log("TEST API RESPONSE \n", response);
        
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        
        toast.success("TEST DATA Successful");

      } catch (error) {
        console.log("TEST API ERROR............", error);
        toast.error(error.response.data.message);
      }
      
      toast.dismiss(toastId);
    }
  }
  