import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../store/slices/userSlice';

function Navbar() {
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.user); 
  
  const handleLogout = () => {
    dispatch(logOut());
  };
  const dates = new Date().toISOString().split("T").at(0);
  return (
    <div className="mx-auto py-0 max-w-[100vw]">
    <div className="bg-gradient-to-r from-[#5B32B5] via-[#5b36a5] to-[#8169b3] shadow-lg w-full relative z-10">
      <div className="w-[95vw] xs:w-11/12 mx-auto max-w-[1600px] px-0 py-2 text-richblack-100 flex items-center text-white font-medium text-2xl justify-between">
        <Link to={"/"}>Vishal Kumar</Link>
        <div className="text-white font-medium text-lg gap-3 xs:gap-5 lg:gap-10 flex items-center group">
          {
            userData ? <Link to={`/dataGraph/IsYoung/true/Gender/Male/StartDate/${dates}/EndDate/${dates}`} className="cursor-pointer border-2 py-1 xs:py-[6px] px-3 xs:px-5 rounded-md">Profile</Link> :
            <Link to={"/login"} className="cursor-pointer border-2 py-1 xs:py-[6px] px-3 xs:px-5 rounded-md">Log In</Link>
          }

          {
            userData ? <button onClick={handleLogout} className="text-blue-400 bg-white py-1 xs:py-[6px] px-3 xs:px-5 rounded-md border-2 hover:text-blue-500 duration-150">Log Out</button> :
            <Link to={"/signup"} className="cursor-pointer border-2 py-1 xs:py-[6px] px-3 xs:px-5 rounded-md">
            Sign Up
          </Link>
          }
          
        </div>
      </div>
    </div>
    </div>
  );
}

export default Navbar;