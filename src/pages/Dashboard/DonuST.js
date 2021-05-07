import React from "react"
import ReactApexChart from "react-apexcharts"

const DountchartST = () => {
  const series = [5, 5, 5]
  const options = {
    labels: ["WATER", "SWAB", "AIR"],
    colors: ["#008FFB", "#00E396", "#FEB019"],
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: -10,
    },
    
    // background: {
    //   foreColor: '#fff !important'
    // },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          
          legend: {
            show: false,
          },
        },
      },
    ],
  }


  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height="380"
    />
  )
}

export default DountchartST
