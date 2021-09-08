import * as ReactDOM from "react-dom";

import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import axios from "axios";
// import Data from "./data.json"

let formattedDate = (date) => {
  const d = new Date(date);
  const newDate = d.getHours() + ":" + d.getMinutes() + ", " + d.toLocaleDateString();
   return newDate;
}
const Charts = () => {
  const [launchTimeChartData, setLaunchChartData] = useState({});

  const chart = () => {
    axios
      .get("https://62n395k23e.execute-api.us-east-2.amazonaws.com/Dev/metrics")
      .then((res) => {
        console.log('res::::: ', res.data.Items);
        
        let dataSets = [];
        let timings = [];
        dataSets = res.data.Items.map(item => {
          let obj = {};
          obj.label = item.projectId;
          item.launchTime.sort((a,b) => (a.recordedTime > b.recordedTime) ? 1 : ((b.recordedTime > a.recordedTime) ? -1 : 0))
          obj.data = item.launchTime.map(d => { return d.value });
          console.log('obj.data: ', obj.data);
          obj.borderColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
          obj.borderWidth = 1;
          timings = item.launchTime.map(d => formattedDate(d.recordedTime));
          return obj;
        });

        setLaunchChartData({
          labels: timings,
          datasets: dataSets
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <div><h1>Launch Time</h1></div>
      <div style={{ height: "1000px", width: "1000px" }}>
        <Line
          data={launchTimeChartData}
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

export default Charts;

// https://www.chartjs.org/docs/latest/charts/line.html