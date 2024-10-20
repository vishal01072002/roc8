import React, { useEffect, useState } from 'react'
import { Chart, registerables} from "chart.js"
import { Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux';
import { plugins } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom'

Chart.register(...registerables);
Chart.register(zoomPlugin);

const LineGraph = ({filters,graphData, selectedBar}) => {
  const dispatch = useDispatch();
  const {graphLoading} = useSelector((state) => state.graph);
  const [lineData, setLineData] = useState([]);

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      // const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

      const color = `hsl(${Math.random() * 360}, 100%, 68%)`
      colors.push(color)
    }
    return colors;
  }

  const dateFormatter = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const date1 = date.split("T").at(0).split("-");
    const date2 = date1[2] + "/" + months[date[1]];
    // console.log(date2);
    return date2;
  }
  const dataColors = generateRandomColors(lineData?.valueArr?.length);
  const linesData = {
    labels : lineData?.dateArr,
    datasets:[
      {
        label: "Trend",
        data: lineData.valueArr,
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 0.9)',
        // elements:{
        //   line:{tension:0.4}
        // }
        segment:{
            //borderColor : generateRandomColors(1)[0],
        }
      }
    ],
  }

  useEffect(() => {
    if(graphData){
      const newLineFiltersData = graphData?.lineChartData?.filter((ele) => {
        return (ele?.Gender === filters.Gender && ele?.IsYoung === filters.IsYoung)
      });

      // console.log(newLineFiltersData);
      const dateArr = [];
      const valueArr = [];
      newLineFiltersData.map((ele) => {
        dateArr.push(dateFormatter(ele.Day));
        valueArr.push(ele[selectedBar]);
      });
      setLineData({dateArr,valueArr})
      // console.log({dateArr,valueArr});
    }
  },[graphData,selectedBar,filters]);

  return (
    <>  
        {lineData?.dateArr?.length === 0 ? <div className='h-full w-10/12 mx-auto text-lg  flex justify-center items-center'>Not Enough Data for Trend select Different Date Range</div> : !graphLoading && <Line data={linesData} options={{scales: {y:{beginAtZero:true}},
          plugins:{
            zoom:{
              limits: {
                    y: {
                        minRange: 0, // This is smallest time window you want to zoom into
                        min: 0,
                        max: 2000,
                    },
                    x: {
                        minRange: 0, // This is smallest time window you want to zoom into
                        min: 0,
                        max: 2000,
                    },
                },
              pan:{
                enabled:true
              },
              zoom: {  
                animation: {
                  duration: 2000,
                  easing: 'easeOutCubic'
                },
                wheel: {
                  enabled: true,
                  speed:0.1,
                },
                pinch: {
                  enabled: true
                },
                mode: 'xy',
              }
            }},maintainAspectRatio:false}} />
        }
        {console.log(lineData)}
    </>
  )
}

export default LineGraph