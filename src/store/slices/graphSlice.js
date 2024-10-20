// for editing and creating quiz till draft
import { createSlice } from "@reduxjs/toolkit";

// shown in my Quiz page
const initialState = {
    graphData : localStorage.getItem("graphData") ? 
            JSON.parse(localStorage.getItem("graphData")) : null,
    editQues : localStorage.getItem("editQues") ? 
            JSON.parse(localStorage.getItem("editQues")) : null,
    graphLoading : false,
};


const quizSlice = createSlice({
    name: "graph",
    initialState: initialState,
    reducers: {
        setGraph(state,value){
            state.graphData = value.payload;
            localStorage.setItem("graphData",JSON.stringify(value.payload));
        },
        setQues(state,value){
            state.editQues = value.payload;
            localStorage.setItem("editQues",JSON.stringify(value.payload));
        },
        setgraphLoading(state,value){
            state.graphLoading = value.payload;
        },
    }
});

export const {setGraph,setgraphLoading,setQues} = quizSlice.actions;
export default quizSlice.reducer;