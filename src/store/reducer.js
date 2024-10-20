import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import graphSlice from "./slices/graphSlice";

const rootReducer = combineReducers({
    user : userSlice,
    graph: graphSlice,
});

export default rootReducer;