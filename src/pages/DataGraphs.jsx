import React, { useEffect, useState } from 'react'
import { test } from '../services/apiCalls/user'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGraphData } from '../services/apiCalls/graph'
import BarGraphs from '../components/core/BarGraphs'
import LineGraph from '../components/core/LineGraph'
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const DataGraphs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const {IsYoung, Gender ,startDate, endDate} = useParams();
  // console.log(IsYoung, Gender ,startDate, endDate);

  //const [filters, setFilters] = useState({
  //  Gender:Gender,
  //  IsYoung:IsYoung,
  //});
  const URL = (window.location.href);
  console.log(URL);
  const [copied, setCopied] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [selectedBar, setSelectedBar] = useState('A');
  const [rangeDate, setRangeDate] = useState({
    startDate: startDate,
    endDate: endDate,
  });

  const rangeHandler = (event) => {
    const { name, value } = event.target;
    setRangeDate((prev) => {
      return { ...prev, [name]: value };
    });
  }
  
  const filterHandler = (event) => {
    const { name, value } = event.target;
    console.log(name,value);
    if(name === "Gender"){
      navigate(`/dataGraph/IsYoung/${IsYoung}/Gender/${value}/StartDate/${startDate}/EndDate/${endDate}`)
      // setFilters((prev) => {
      //   return {...prev, [name]:value};
      // })
    }
    else{
      if(value === "15-25"){
        navigate(`/dataGraph/IsYoung/true/Gender/${Gender}/StartDate/${startDate}/EndDate/${endDate}`)
      }
      else{
        navigate(`/dataGraph/IsYoung/false/Gender/${Gender}/StartDate/${startDate}/EndDate/${endDate}`)
      }
    }
  }

  const apiCallHandler = async() =>{
    if(rangeDate.startDate <= rangeDate.endDate){
      // console.log(rangeDate.startDate > rangeDate.endDate);
      console.log(rangeDate);
      const data = await dispatch(fetchGraphData(rangeDate));
      setGraphData(data);
      navigate(`/dataGraph/IsYoung/true/Gender/Male/StartDate/${rangeDate.startDate}/EndDate/${rangeDate.endDate}`)
    }
    else{
      toast.error("Invalid Range");
    }
  }

  const submitHandler = async()=>{
    await apiCallHandler();
  }

  useEffect(() => {
    apiCallHandler();
  },[])
  // useEffect(() => {
  //   
  //   console.log("called");
  //   console.log(location.search);
  // },[startDate,endDate]);

  return (
    <>
    {!graphData? <div className='w-full text-center mt-10 text-lg'>Loading..</div> : <div className='w-full py-8'>
      <div className='h-[24rem] flex justify-around gap-1'>
        <div className='w-[45%]'>
          <BarGraphs filters={{Gender,IsYoung:IsYoung === "true" ? true : false}} graphData={graphData} setSelectedBar={setSelectedBar}/>
        </div>
        <div className='w-[45%]'>
          <LineGraph filters={{Gender,IsYoung:IsYoung === "true" ? true : false}} graphData={graphData} selectedBar={selectedBar}/>
        </div>
      </div>

      <div className='flex mt-8 items-center justify-around w-full'>
        <div className='flex items-center gap-5'>
        <label className='flex border-2 px-2 rounded-md border-purple-950' htmlFor="Gender">
          <p className='w-max'>Gender : </p>
          <select
            name="Gender"
            id="Gender"
            value={Gender}
            onChange={filterHandler}
            className="focus:border-none border-none outline-none"
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>

        <label className='flex border-2 px-2 rounded-md border-purple-950' htmlFor="IsYoung">
          <p className='w-max'>Age : </p>
          <select
            name="IsYoung"
            id="IsYoung"
            value={IsYoung === "true" ? "15-25" : ">25"}
            onChange={filterHandler}
            className="focus:border-none border-none outline-none"
          >
            <option>{`15-25`}</option>
            <option>{`>25`}</option>
          </select>
        </label>
        </div>

        <div className='flex justify-between cursor-pointer gap-4'>
                <span className='text-blue-500 border px-3 rounded-sm border-blue-500 font-semibold relative cursor-pointer' onClick={() =>{  navigator.clipboard.writeText(`${URL}/`);
                setCopied(true);
                setTimeout(()=> setCopied(false) , 3000)}}>Share Link<p className={`absolute ${copied ? "opacity-100" : "opacity-0"} duration-300 transition-opacity text-white -top-9 font-normal -left-2 px-1 py-[1px] rounded-md bg-blue-400`}>Copied</p></span>
        </div>

        <div className='flex gap-2'>
        <label htmlFor="startDate">
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={rangeDate.startDate}
            onChange={rangeHandler}
            className="border-2 px-2 rounded-md border-purple-950"
          />
        </label>
        <p className='text-xl'> to </p>
        <label htmlFor="endDate">
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={rangeDate.endDate}
            onChange={rangeHandler}
            className="border-2 px-2 rounded-md border-purple-950"
          />
        </label>
        <button onClick={() => submitHandler()} className='cursor-pointer border-2 xs:py-[6px] font-medium px-5 xs:px-5 rounded-md border-purple-950 bg-purple-600 text-white transition-colors hover:bg-purple-500 duration-200'>Apply</button>
        </div>
      </div>
    </div>}
    </>
  )
}

export default DataGraphs