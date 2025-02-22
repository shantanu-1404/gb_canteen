import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UTMTrackingChart = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("Facebook");
  const [activeDatasets, setActiveDatasets] = useState({
    Like: true,
    Comments: true,
    Share: true,
  });

  // Chart data for different platforms
  const platformData = {
    Facebook: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Like",
          data: [30, 50, 70, 80, 60, 90, 100],
          borderColor: "#52279B",
          backgroundColor: "rgba(82, 39, 155, 0.2)",
          fill: true,
          tension: 0.4,
          hidden: !activeDatasets.Like,
        },
        {
          label: "Comments",
          data: [40, 60, 80, 70, 50, 60, 55],
          borderColor: "#CB89B9",
          backgroundColor: "rgba(203, 137, 185, 0.2)",
          fill: true,
          tension: 0.4,
          hidden: !activeDatasets.Comments,
        },
        {
          label: "Share",
          data: [20, 30, 50, 40, 30, 60, 45],
          borderColor: "#728CC7",
          backgroundColor: "rgba(114, 140, 199, 0.2)",
          fill: true,
          tension: 0.4,
          hidden: !activeDatasets.Share,
        },
      ],
    },
    Instagram: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Like",
          data: [20, 40, 60, 75, 65, 85, 95],
          borderColor: "#52279B",
          backgroundColor: "rgba(82, 39, 155, 0.2)",
          fill: true,
          tension: 0.4,
          hidden: !activeDatasets.Like,
        },
        {
          label: "Comments",
          data: [30, 50, 65, 60, 55, 70, 60],
          borderColor: "#CB89B9",
          backgroundColor: "rgba(203, 137, 185, 0.2)",
          fill: true,
          tension: 0.4,
          hidden: !activeDatasets.Comments,
        },
        {
          label: "Share",
          data: [15, 35, 55, 45, 40, 55, 50],
          borderColor: "#728CC7",
          backgroundColor: "rgba(114, 140, 199, 0.2)",
          fill: true,
          tension: 0.4,
          hidden: !activeDatasets.Share,
        },
      ],
    },
    Other: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Like",
          data: [10, 20, 40, 60, 55, 65, 80],
          borderColor: "#52279B",
          backgroundColor: "rgba(82, 39, 155, 0.2)",
          fill: true,
          tension: 0.4,
          hidden: !activeDatasets.Like,
        },
        {
          label: "Comments",
          data: [20, 30, 50, 45, 40, 60, 50],
          borderColor: "#CB89B9",
          backgroundColor: "rgba(203, 137, 185, 0.2)",
          fill: true,
          tension: 0.4,
          hidden: !activeDatasets.Comments,
        },
        {
          label: "Share",
          data: [10, 25, 45, 35, 30, 50, 40],
          borderColor: "#728CC7",
          backgroundColor: "rgba(114, 140, 199, 0.2)",
          fill: true,
          tension: 0.4,
          hidden: !activeDatasets.Share,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          generateLabels: (chart) => {
            const originalLabels =
              ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            return originalLabels.map((label) => {
              return label;
            });
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  const handleLegendClick = (e, datasetIndex) => {
    const datasetName =
      platformData[selectedPlatform].datasets[datasetIndex].label;
    setActiveDatasets((prevState) => ({
      ...prevState,
      [datasetName]: !prevState[datasetName],
    }));
  };

  return (
    <div
      className=" section_card"
    >
      <div className="chart-header">
        <h3>UTM Tracking</h3>
        {/* Platform selection buttons */}
        <div className="platform-card">
          <div className="platform-buttons">
            <button
              onClick={() => handlePlatformChange("Facebook")}
              className={selectedPlatform === "Facebook" ? "active" : ""}
            >
              Facebook
            </button>
            <button
              onClick={() => handlePlatformChange("Instagram")}
              className={selectedPlatform === "Instagram" ? "active" : ""}
            >
              Instagram
            </button>
            <button
              onClick={() => handlePlatformChange("Other")}
              className={selectedPlatform === "Other" ? "active" : ""}
            >
              Other
            </button>
          </div>
        </div>
      </div>

      <div className="chart-body">
        <Line
          data={platformData[selectedPlatform]}
          options={options}
          onElementsClick={(e) => handleLegendClick(e, e[0]._datasetIndex)}
        />
      </div>

      {/* Chart Legend Labels */}
      <div className="chart-legend">
        <span className="dot like"></span> Like
        <span className="dot comments"></span> Comments
        <span className="dot share"></span> Share
      </div>
    </div>
  );
};

export default UTMTrackingChart;
