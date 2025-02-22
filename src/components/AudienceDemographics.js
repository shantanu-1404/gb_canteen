import React, { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartAnnotation from 'chartjs-plugin-annotation';

// Register necessary components for Chart.js and the annotation plugin
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartAnnotation);

const AudienceDemographics = () => {
  const chartRef = useRef(null); // Ref to access the canvas
  const data = {
    labels: ['18-24 Age', '25-34 Age', '35-44 Age', '44+ Age'], // Age groups as labels
    datasets: [
      {
        data: [47, 25, 18, 10], // Percentage values for each age group
        backgroundColor: ['#4A90E2', '#CB89B9', '#52279B', '#6F42C1'], // Colors for each slice
        borderWidth: 8, // This will add a gap between the sections
        borderColor: '#fff', // White color between the sections
        hoverBorderColor: '#fff', // Border on hover
        fill: true,
        tension: 0.4,
        offset: 5, // Adds a gap between the sections
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Show percentage on hover
          },
        },
      },
    },
    cutout: '50%', // To make it a donut chart (this defines the hole in the middle)
    elements: {
      arc: {
        borderRadius: 30, // Circular corners for each segment
      },
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'radial',
          scaleID: 'r',
          value: 47, // Starting percentage value for the first section
          borderColor: '#CB89B9', // Color for the dashed line
          borderWidth: 2,
          borderDash: [5, 5], // Dashed line style
          angle: 60, // Position the dashed line for 18-24 Age (adjusted for better positioning)
          label: {
            enabled: true,
            content: '47%', // Percentage label
            position: 'outside', // Position label outside the doughnut chart
            backgroundColor: 'pink', // Make the label background pink
            color: '#CB89B9', // Pink text color
            font: {
              size: 14,
              weight: 'bold',
            },
            xAdjust: 10, // Adjust horizontally to position at the corner
            yAdjust: -10, // Adjust vertically to position at the corner
          },
        },
        {
          type: 'line',
          mode: 'radial',
          scaleID: 'r',
          value: 25, // Starting percentage value for the second section
          borderColor: '#CB89B9',
          borderWidth: 2,
          borderDash: [5, 5], // Dashed line style
          angle: 180, // Position for 25-34 Age (adjusted for better positioning)
          label: {
            enabled: true,
            content: '25%',
            position: 'outside',
            backgroundColor: 'pink',
            color: '#CB89B9',
            font: {
              size: 14,
              weight: 'bold',
            },
            xAdjust: 10,
            yAdjust: -10,
          },
        },
        {
          type: 'line',
          mode: 'radial',
          scaleID: 'r',
          value: 18, // Starting percentage value for the third section
          borderColor: '#CB89B9',
          borderWidth: 2,
          borderDash: [5, 5], // Dashed line style
          angle: 300, // Position for 35-44 Age (adjusted for better positioning)
          label: {
            enabled: true,
            content: '18%',
            position: 'outside',
            backgroundColor: 'pink',
            color: '#CB89B9',
            font: {
              size: 14,
              weight: 'bold',
            },
            xAdjust: 10,
            yAdjust: -10,
          },
        },
        {
          type: 'line',
          mode: 'radial',
          scaleID: 'r',
          value: 10, // Starting percentage value for the fourth section
          borderColor: '#CB89B9',
          borderWidth: 2,
          borderDash: [5, 5], // Dashed line style
          angle: 420, // Position for 44+ Age (adjusted for better positioning)
          label: {
            enabled: true,
            content: '10%',
            position: 'outside',
            backgroundColor: 'pink',
            color: '#CB89B9',
            font: {
              size: 14,
              weight: 'bold',
            },
            xAdjust: 10,
            yAdjust: -10,
          },
        },
      ],
    },
    onReady: () => {
      // Ensure the chart is fully rendered before accessing the canvas
      createDashedLines();
    },
  };

  // Function to position the dashed lines
  const createDashedLines = () => {
    const chartInstance = chartRef.current.chartInstance;
    const canvas = chartInstance.canvas;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 4;

    // Define dashed lines for each section
    const angles = [60, 180, 300, 420]; // Angles based on your chart sections
    const percentages = [47, 25, 18, 10]; // Percentages

    // Create horizontal dashed line
    ctx.beginPath();
    ctx.setLineDash([5, 5]); // Dashed line style
    ctx.moveTo(0, centerY); // Start from the left side of the canvas
    ctx.lineTo(width, centerY); // End at the right side
    ctx.strokeStyle = '#CB89B9';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash for next lines

    // Create tilted dashed lines for each section
    angles.forEach((angle, index) => {
      const radian = (angle * Math.PI) / 180;
      const startX = centerX + Math.cos(radian) * radius;
      const startY = centerY + Math.sin(radian) * radius;
      const endX = centerX + Math.cos(radian) * (radius + 30); // Extend the line a bit outside the donut
      const endY = centerY + Math.sin(radian) * (radius + 30);

      ctx.beginPath();
      ctx.setLineDash([5, 5]); // Dashed line style
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = '#CB89B9';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Add percentage label at the end of the dashed line
      const labelX = endX + 10; // Position label horizontally to the right
      const labelY = endY - 10; // Position label slightly above the line
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#CB89B9';
      ctx.fillText(`${percentages[index]}%`, labelX, labelY);
    });
  };

  return (
    <div className="section_card">
      <div className="chart-header">
        <h3>Audience Demographics</h3>
      </div>

      {/* Chart Legend Labels */}
      <div className="chart-body">
        <Doughnut ref={chartRef} data={data} options={options} />
      </div>
      <div className="chart-legend">
        <span className="dot share"></span> 18-24 Age
        <span className="dot comments"></span> 25-34 Age
        <span className="dot age"></span> 35-44 Age
        <span className="dot like"></span> 44+ Age
      </div>
    </div>
  );
};

export default AudienceDemographics;
