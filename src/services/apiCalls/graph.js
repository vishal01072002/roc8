import { toast } from "react-toastify"
import {apiConnector} from "../apiConnector"
import {graphEndpoints} from "../endPoint"
import {setGraph,setgraphLoading} from "../../store/slices/graphSlice"

export const fetchGraphData = (data) => {
    return async(dispatch)=>{    
      const toastId = toast.loading("Loading...");
      dispatch(setgraphLoading(true));
      
      try {
        //console.log("link", graphEndpoints.GRAPH_DATA);
        const response = await apiConnector("POST",graphEndpoints.GRAPH_DATA,data);
        console.log("GRAPH API RESPONSE \n", response);
        
        if (!response?.data?.success) {
          throw new Error(response.data.message);
        }
        
        toast.success("GRAPH DATA Successful");
        toast.dismiss(toastId);
        dispatch(setgraphLoading(false));
        return response?.data;
        // dispatch(setGraph(response?.data));
        
      } catch (error) {
        console.log("GRAPH API ERROR............", error);
        toast.error(error.response.data.message);
      }
      
      toast.dismiss(toastId);
      return null;
    }
  }