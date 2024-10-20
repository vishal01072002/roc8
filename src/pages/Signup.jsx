import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signup } from "../services/apiCalls/user";

export const Signup = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async(data)=> { 
    //match password
    if(data.YourPassword !== data.confirmPassword){
      toast.error("Password Not Match");
      return;
    }

    // create object variable to store that all data
    const newForm = {
      userName : data.UserName,
      email : data.YourEmail,
      password : data.YourPassword,
      confirmPassword : data.confirmPassword,
    };

    // console.log(newForm);
    dispatch(signup(newForm,navigate));
  }

  return (
    <div className="relative max-h-screen">
      <div className="max-h-[90vh] mt-10 flex w-full justify-center">

      <div className=" bg-slate-50 w-[95vw] sm:max-w-[400px] sm:min-w-[480px] px-4 xs:px-8 sm:px-12 py-4 rounded-md flex flex-col gap-5 sm:gap-8 items-center justify-between">
        <p className="text-4xl md:text-5xl font-bold text-blue-800">Welcome</p>
        <form onSubmit={handleSubmit(submitHandler)} className="w-full flex flex-col gap-3 sm:gap-5">
          <div className=" w-full">
          <input 
          id='Name'
          type="text"
          placeholder='Enter Your Full Name'
          {...register("UserName", {required:true})}
          className='w-full form-style'
          />
          {errors.UserName && (<span className="absolute w-max -translate-x-full -ml-4 mt-3 text-pink-700">Name is required</span>)}
          </div>

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

        <div className=" w-full">
          <input 
          id='confirmPassword'
          type="password"
          placeholder='Enter Confirm Password'
          {...register("confirmPassword", {required:true})}
          className='w-full form-style'
          />
          {errors.confirmPassword && (<span className="absolute w-max -translate-x-full -ml-4 mt-3 text-pink-700">Password is required</span>)}
          </div>

        <button type="submit" className='w-full text-yellow-50 text-xl rounded-lg font-bold bg-blue-700 px-4 py-2 mt-4 hover:bg-blue-800 duration-150'>Sign Up</button>

        <Link to={"/login"} className="text-blue-600 hover:text-blue-800 font-medium">
        Already Have an Account? Login  
        </Link>
      </form>

      </div>

      </div>
    </div>
  );
};