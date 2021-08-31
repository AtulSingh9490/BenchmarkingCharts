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
    
//     // let formattedDate = (date) => {
//     //   return new Date(date).toLocaleDateString("en-US")
//     // }

//     axios
//       .get("https://62n395k23e.execute-api.us-east-2.amazonaws.com/Dev/metrics")

//       .then((res) => {
//         console.log(res);
//         // for (const dataObj of res.data.data) {
//         //   empSal.push(parseFloat(dataObj.launchTime));
//         //   empAge.push(parseFloat(dataObj.buildTime));
//         //   timings.push(formattedDate(dataObj.creationDate));
//         // }
//         let dataSets = [];
//         let timings = [];
//         let formattedDate = (date) => {
//           const newDate = new Date(date * 1000).toLocaleDateString("en-US")
//           console.log(newDate)
//           return newDate;
//         }
//         dataSets = res.data.dataSet.map(item => {
//           let obj = {};
//           obj.label = item.projectId;
//           obj.data =  item.data.map(data => data.launchTime );
//           obj.backgroundColor = ["rgba(255, 206, 132, 0.2)"];
//           // timings = [...timings, ...item.data.map(data => formattedDate (data.creationDate) )];
//           timings = item.data.map(data => formattedDate (data.creationTimestamp));
//           // timings = [...new Set(timings)];
//           console.log(timings);
//           return obj;
//         })
        
//         setChartData({
//           labels: timings,
//           datasets: dataSets
//         });
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
//       <div><h1>Charts</h1></div>
      
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
