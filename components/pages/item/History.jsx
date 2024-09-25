"use client";
import { GetPriceHistory } from "@/actions/axios/nft.axios";
import { isEmpty } from "@/actions/common";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  LineController,
} from "chart.js";
import { useEffect, useState } from "react";
import Config from '@/Config/config'
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  LineController
);
import { Bar } from "react-chartjs-2";
const options = [
  { value: "7", label: "Last 7 Days" },
  { value: "14", label: "Last 14 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "60", label: "Last 60 Days" },
  { value: "90", label: "Last 90 Days", selected: true },
  { value: "365", label: "Last Year" },
  { value: "all", label: "All Time" },
];
const footer = (tooltipItems) => {
  let sum = 1;
  tooltipItems.forEach(function (tooltipItem) {
    sum *= tooltipItem.parsed.y;
  });
  return (
    "Volume: " + Intl.NumberFormat("en-US", { notation: "compact" }).format(sum)
  );
};
const chartsOptions = {
  maintainAspectRatio: false,
  responsive: true,
  interaction: {
    intersect: false,
    mode: "index",
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        stepSize: 50,
      },
    },
  },
  plugins: {
    legend: { display: false },
    decimation: {
      enabled: true,
    },
    tooltip: {
      usePointStyle: true,
      position: "nearest",
      backgroundColor: "#131740",
      titleAlign: "center",
      bodyAlign: "center",
      footerAlign: "center",
      padding: 12,
      displayColors: false,
      yAlign: "bottom",
      callbacks: {
        footer: footer,
      },
    },
  },
  animation: false,
};
const chartData = {
  labels: [
    "Jan 23",
    "Jan 24",
    "Jan 25",
    "Jan 26",
    "Jan 27",
    "Jan 28",
    "Jan 29",
  ],
  datasets: [
    {
      type: "line",
      label: "Avg. price",
      backgroundColor: "#10B981",
      borderColor: "#10B981",
      data: [54.73, 64, 53, 96, 130, 100, 102.88],
    },
    {
      type: "bar",
      label: "Price",
      backgroundColor: "#E7E8EC",
      data: [25, 20, 40, 130, 75, 48, 12],
    },
  ],
};
const months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
export default function History({NFTId}) {
  const [avgprice ,setAvgprice]=useState(0)
  const [avgqty,setAvgqty] = useState(0)
  const [days,setDays] = useState("7")
  const [chartData,setChartData] = useState({
    labels: [
      "Jan 23",
      "Jan 24",
      "Jan 25",
      "Jan 26",
      "Jan 27",
      "Jan 28",
      "Jan 29",
    ],
    datasets: [
      {
        type: "bar",
        label: "Price",
        backgroundColor: "#E7E8EC",
        data: [25, 20, 40, 130, 75, 48, 12],
      },
    ],
  })

  useEffect(()=>{
     if(NFTId){
      getData(NFTId)
     }
  },[NFTId,days])

  const getData = async (NFTId) =>{
    let resp = await GetPriceHistory({NFTId , days})
    console.log("🚀 ~ getData ~ resp:", resp,NFTId , days)
    let labels = [];
    let data = {
      type: "bar",
      label: "Price",
      backgroundColor: "#E7E8EC",
      data : [],
    };
    let qty = []
    if(!isEmpty(resp.data)){
      resp.data?.map((val)=>{
        let date = `${months[Number(new Date(val.createdAt).getMonth())]} ${new Date(val.createdAt).getDate()}`
        labels.push(date);
        data.data.push(Number(val.NFTPrice))
        qty.push(val.NFTQuantity)
      })
      setAvgprice(data.data.reduce((accumulator, currentValue) => accumulator + currentValue,
      0)/data.data.length)
      setAvgqty(qty.reduce((accumulator, currentValue) => accumulator + currentValue,
      0)/qty.length)
    console.log("🚀 ~ getData ~ data:", data,labels)
    }
    setChartData({...chartData,"labels" : labels , datasets : [data]})
  }

  return (
    <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-jacarta-100 bg-white p-6 dark:border-jacarta-600 dark:bg-jacarta-700">
      {/* Period / Stats */}
      <div className="mb-10 flex flex-wrap items-center">
        <select  onChange={(e)=>setDays(e.target.value)} defaultValue={`${days}`} className="mr-8 min-w-[12rem] rounded-lg border-jacarta-100 py-3.5 text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white">
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              defaultValue={option.selected ? "selected" : null}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="py-2">
          <span className="mr-4 inline-block align-middle">
            <span className="block text-sm font-bold dark:text-white">
              {days} Day Avg. Price:
            </span>
            <span className="block text-sm font-bold text-green">Ξ {avgprice.toFixed(4)}</span>
          </span>

          <span className="inline-block align-middle">
            <span className="block text-sm font-bold dark:text-white">
            {days} Day Volume:
            </span>
            <span className="block text-sm font-bold text-green">
              Ξ {avgqty}
            </span>
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container relative h-80 w-full">
        <Bar options={chartsOptions} data={chartData} />
      </div>
    </div>
  );
}
