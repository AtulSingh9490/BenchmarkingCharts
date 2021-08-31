import * as ReactDOM from "react-dom";

import React, { useState, useEffect } from "react";
import Hammer from "hammerjs";

import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { PieChart } from "react-chartjs-2";
import axios from "axios";
// import Data from "./data.json"

const ChartDisplay = () => {
  const [chartData, setChartData] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);
  const [timing, setTiming] = useState([]);
  const chart = () => {
    let empSal = [];
    let empAge = [];
    let urlData = "https://62n395k23e.execute-api.us-east-2.amazonaws.com/Dev/metrics"
    const getdata = async () => {
      try {
        const { data } = await axios.get(
          encodeURI( urlData )
        );
        console.log(data);
        return data;
      } catch (error) {
        throw error;
      }
    };
    getdata();
    axios
      .get( urlData )

      .then((res) => {
        console.log(res);
        let sortedResponse = res['data'].Items.sort((a,b) => (a.creationTimestamp > b.creationTimestamp) ? 1 : -1)
        
        // let timings = [];
        let formattedDate = (date) => {
          const newDate = new Date(date).toLocaleDateString("en-US");
          console.log(newDate);
          return newDate;
        };
        let timings = sortedResponse.map((item) => {
          return formattedDate(item.creationTimestamp);
        });
        let data = sortedResponse.map((item) => {
          let obj = {};
          obj.label = item.projectId;
          obj.data = sortedResponse.map((data) => data.buildTime);
          
          obj.backgroundColor = ["rgba(255, 206, 132, 0.2)"];
          // timings = [...timings, ...item.data.map(data => formattedDate (data.creationDate) )];
          // timings = item.data.map((data) =>
          //   formattedDate(data.creationTimestamp)
          // );
          // obj.timings = item.creationTimestamp;
          // timings = formattedDate(obj.timings);
          // console.log(item);
          //timings = [...new Set(timings)];
          // console.log(timings);
          return obj;
          
        });
        
        
        setChartData({
          labels: timings,
          datasets: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(empSal, empAge);
  };

  useEffect(() => {
    chart();
  }, []);
  console.log(chartData);
  return (
    <div className="App">
      {/* <div>
        <h1>BuildTime</h1>
      </div> */}

      <div style={{  width: "1000px" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
      <div style={{ width: "1000px" }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartDisplay;
