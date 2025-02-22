import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LoadTimeChart = () => {
  const [timePeriod, setTimePeriod] = useState("Days"); // Default to 'Days'

  // Data for each time period (Days, Month, Year)
  const data = {
    Days: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Total Spend",
          data: [50, 80, 70, 60, 90, 110, 100],
          backgroundColor: "#CB89B9",
          borderRadius: 70, // Apply circular corners to the bars
        },
        {
          label: "ROI",
          data: [40, 60, 80, 50, 70, 90, 95],
          backgroundColor: "#728CC7",
          borderRadius: 70, // Apply circular corners to the bars
        },
      ],
    },
    Month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Total Spend",
          data: [250, 300, 450, 600],
          backgroundColor: "#CB89B9",
          borderRadius: 70, // Apply circular corners to the bars
        },
        {
          label: "ROI",
          data: [200, 250, 400, 500],
          backgroundColor: "#728CC7",
          borderRadius: 70, // Apply circular corners to the bars
        },
      ],
    },
    Year: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Total Spend",
          data: [5000, 8000, 7000, 10000],
          backgroundColor: "#CB89B9",

          borderRadius: 70, // Apply circular corners to the bars
        },
        {
          label: "ROI",
          data: [4000, 6000, 8000, 9500],
          backgroundColor: "#728CC7",
          borderRadius: 70, // Apply circular corners to the bars
        },
      ],
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  // Function to handle time period changes (Days, Month, Year)
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  return (
    <div className="section_card">
      <div className="chart-header">
        <h3>Load Time</h3>
        {/* Buttons for selecting time period */}
        <div className="platform-card">
          <div className="platform-buttons">
            <button
              onClick={() => handleTimePeriodChange("Days")}
              className={timePeriod === "Days" ? "active" : ""}
            >
              Days
            </button>
            <button
              onClick={() => handleTimePeriodChange("Month")}
              className={timePeriod === "Month" ? "active" : ""}
            >
              Month
            </button>
            <button
              onClick={() => handleTimePeriodChange("Year")}
              className={timePeriod === "Year" ? "active" : ""}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Render the chart */}
      <Bar data={data[timePeriod]} options={options} />
      <div className=" chart-body chart-legend">
        <span className="dot comments"></span>Total Spend
        <span className="dot share"></span> ROI
      </div>
    </div>
  );
};

export default LoadTimeChart;
