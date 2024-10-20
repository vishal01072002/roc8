import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../services/apiCalls/user";

export const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async(data)=> {
    // create object variable to store that all data
    const newForm = {
      email : data.YourEmail,
      password : data.YourPassword,
    };

    console.log(newForm);
    dispatch(login(newForm,navigate));
  }

  return (
    <div className="relative h-full">
      <div className="min-h-[100%] mt-10 flex w-full justify-center">

      <div className=" bg-slate-50 w-[95vw] sm:max-w-[400px] sm:min-w-[480px] px-4 xs:px-8 sm:px-12 py-4 rounded-md flex flex-col gap-5 sm:gap-8 items-center justify-between h-full">
        <p className="text-4xl mb-4 md:text-5xl font-bold text-blue-800">Welcome Back</p>
        <form onSubmit={handleSubmit(submitHandler)} className="w-full flex flex-col gap-3 sm:gap-5">

          <div className=" w-full">
          <input 
          id='email'
          type="email"
          placeholder='Enter Your Email'
          {...register("YourEmail", {required:true})}
          className='w-full form-style'
          />
          {errors.YourEmail && (<span className="absolute w-max -translate-x-full -ml-4 mt-3 text-pink-700">Email is required</span>)}
          </div>
        
        <div className=" w-full">
          <input 
          id='password'
          type="password"
          placeholder='Enter Your Password'
          {...register("YourPassword", {required:true})}
          className='w-full form-style'
          />
          {errors.YourPassword && (<span className="absolute w-max -translate-x-full -ml-4 mt-3 text-pink-700">Password is required</span>)}
          </div>

          <button type="submit" className='w-full text-yellow-50 text-xl rounded-lg font-bold bg-blue-700 px-4 py-2 mt-4 hover:bg-blue-800 duration-150'>Sign In</button>


          <Link to={"/login"} className="text-blue-600 hover:text-blue-800 font-medium">Don’t Have an Account? Sign Up</Link>
        </form>
      </div>

      </div>
    </div>
  );
};