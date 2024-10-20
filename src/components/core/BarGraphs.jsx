import React, { useEffect, useState } from 'react'
import { Chart, registerables} from "chart.js"
import { Bar } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux';

Chart.register(...registerables);
const BarGraphs = ({filters,graphData,setSelectedBar}) => {
    const dispatch = useDispatch();
    const {graphLoading} = useSelector((state) => state.graph);
    const [barData, setBarData] = useState([]);

    const graphBarClick = (event,arr) =>{
        // console.log(event,arr);
        if(arr.length > 0){
            // console.log(barData[arr[0].index][0]);
            setSelectedBar(barData[arr[0].index][0])
        }
    }
    // Bar data template
    

    useEffect(() => {
        if(graphData){
          const newBarFiltersData = graphData.barData.filter((data) =>{  
            console.log(data.IsYoung,(Boolean(filters.IsYoung)));
            return ((data.Gender === filters.Gender) && (data.IsYoung == (filters.IsYoung)));
          });
  
          // console.log(newBarFiltersData);
          const newBarData = [];
          newBarFiltersData.length !== 0 && Object.entries(newBarFiltersData[0]).map((ele)=>{
            if((ele[0] !== "Gender" && ele[0] !== "IsYoung")){
              newBarData.push(ele);
            }
          })
        
          //const newBarData = newBarData
          // console.log(newBarData.map(e => e[0]));
          console.log(newBarData);
          setBarData(newBarData)
          console.log(newBarData?.map(e => e[1]));
  
        }
    },[graphData,filters]);
  
    return (
    <>
    {barData?.length === 0 ? <div className='h-full w-10/12 mx-auto text-lg  flex justify-center items-center'>Not Enough Data for feature select Different Date Range</div> : !graphLoading && <Bar type='horizontalBar' 
      options={{
        onClick:graphBarClick,
        maintainAspectRatio:false,indexAxis:'y',
      }} 
    data={{
      labels: barData.map(e => e[0]),
      datasets: [{
        label: 'Time Spend',
        data: barData.map(e => e[1]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        barPercentage : 0.9,
        borderWidth:1,
      }],
    }}/>}
    </>
  )
}

export default BarGraphs