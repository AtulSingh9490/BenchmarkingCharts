// import * as ReactDOM from "react-dom";

// import React, { useState, useEffect } from "react";
// import Hammer from "hammerjs";

// import { Line } from "react-chartjs-2";
// import { Bar } from "react-chartjs-2";
// import { PieChart } from "react-chartjs-2";
// import axios from "axios";
// // import Data from "./data.json"

// const Charts = () => {
//   const [chartData, setChartData] = useState({});
//   const [employeeSalary, setEmployeeSalary] = useState([]);
//   const [employeeAge, setEmployeeAge] = useState([]);
//   const [timing, setTiming] = useState([]);
//   const chart = () => {
//     let empSal = [];
//     let empAge = [];
//     let formattedDate = (date) => {
//       return new Date(date).toLocaleDateString("en-US");;
//     };
//     let url = "https://62n395k23e.execute-api.us-east-2.amazonaws.com/Dev/metrics"
//     const getdata = async () => {
//       try {
//         const { data } = await axios.get(
//           encodeURI( url )
//         );
//         console.log(data);
//         return data;
//       } catch (error) {
//         throw error;
//       }
//     };
//     getdata();
//     axios.get( url )
//     .then((res) => {
//         console.log(res);
//         let dataIndex1 = res['Items'][0];
//         console.log('dataIndex1: ', dataIndex1);

//         // let sortedResponse = res['Items'].sort((a,b) => (a.creationTimestamp > b.creationTimestamp) ? 1 : -1)
//         // let timings = sortedResponse.map((item) => {
//         //   return formattedDate(item.creationTimestamp);
//         // });
        
//         // let data = sortedResponse.map((item) => {
//         //   let obj = {};
//         //   var randomColor = Math.floor(Math.random()*16777215).toString(16);
//         //   obj.label = item.projectId;
//         //   obj.data = sortedResponse.map((data) => data.launchTime);
//         //   obj.backgroundColor = randomColor;
//         //   return obj;
//         // });
        
//         // setChartData({
//         //   labels: timings,
//         //   datasets: data,
//         // });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     console.log(empSal, empAge);
//   };

//   useEffect(() => {
//     chart();
//   }, []);
//   console.log(chartData);
//   return (
//     <div className="App">
//       {/* <div>
//         <h3>LaunchTime</h3>
//       </div> */}

//       <div style={{ height: "1000px", width: "1000px" }}>
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             title: { text: "THICCNESS SCALE", display: true },
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     autoSkip: true,
//                     beginAtZero: true,
//                   },
//                   gridLines: {
//                     display: false,
//                   },
//                 },
//               ],
//               xAxes: [
//                 {
//                   gridLines: {
//                     display: false,
//                   },
//                 },
//               ],
//             },
//           }}
//         />
//       </div>
//       <div style={{ height: "1000px", width: "1000px" }}>
//         <Bar
//           data={chartData}
//           options={{
//             responsive: true,
//             title: { text: "THICCNESS SCALE", display: true },
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     autoSkip: true,
//                     maxTicksLimit: 10,
//                     beginAtZero: true,
//                   },
//                   gridLines: {
//                     display: false,
//                   },
//                 },
//               ],
//               xAxes: [
//                 {
//                   gridLines: {
//                     display: false,
//                   },
//                 },
//               ],
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Charts;

///////////////////////////////////////////////
import * as ReactDOM from "react-dom";

import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import axios from "axios";
// import Data from "./data.json"

let formattedDate = (date) => {
  const newDate = new Date(date).toLocaleDateString("en-US")
  console.log(newDate)
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
          obj.data = item.launchTime.map(item => { return item.value});
          obj.backgroundColor = ["rgba(255, 206, 132, 0.2)"];
          timings = item.launchTime.map(data => formattedDate(data.recordedTime));
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
      <div><h1>Charts</h1></div>
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
