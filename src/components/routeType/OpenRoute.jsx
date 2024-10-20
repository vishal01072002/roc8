import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const OpenRoute = ({ children }) => {
    
    const {userData} = useSelector( (state)=> state.user);
    return <div>{
        (userData === null) ? <div>{children}</div> : <Navigate to={"/dataGraph"}></Navigate>
        
    }</div>;
};