import { createSlice } from "@reduxjs/toolkit";

// so we need to maintain that signup form data
const initialState = {
    loading : false,
    userData: localStorage.getItem("vizualUserData") ? 
            JSON.parse(localStorage.getItem("vizualUserData")) : null,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers:{
        setLoading(state,value){
            state.loading = value.payload;
        },
        setUserData(state,value){
            state.userData = value.payload;
            localStorage.setItem("vizualUserData",JSON.stringify(value.payload));
        },
        logOut(state){
            localStorage.setItem("vizualUserData",null);
            state.userData = null;
        }
        
    }
});

export const {setLoading, setUserData, setToken, logOut} = userSlice.actions;
export default userSlice.reducer;