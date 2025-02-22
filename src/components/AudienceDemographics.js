import React, { useRef, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// SectionLine Component to render individual lines for each section dynamically
const SectionLine = ({ percentage, startAngle, endAngle }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 4; // Distance from center to donut edge

    const middleAngle = startAngle + (endAngle - startAngle) / 2; // Calculate middle angle of section

    // Calculate the position of the tilted line’s endpoint
    const endX = centerX + Math.cos(middleAngle * Math.PI / 180) * (radius + 30);
    const endY = centerY + Math.sin(middleAngle * Math.PI / 180) * (radius + 30);

    // Determine horizontal line direction based on section position
    let horizontalLength = 40;
    let horizontalEndX = endX;
    let horizontalEndY = endY;

    if (middleAngle >= 0 && middleAngle < 90) {
      // Top-right quadrant
      horizontalEndX += horizontalLength;
    } else if (middleAngle >= 90 && middleAngle < 180) {
      // Top-left quadrant
      horizontalEndX -= horizontalLength;
    } else if (middleAngle >= 180 && middleAngle < 270) {
      // Bottom-left quadrant
      horizontalEndX -= horizontalLength;
    } else {
      // Bottom-right quadrant
      horizontalEndX += horizontalLength;
    }

    // Draw the tilted dashed line
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#CB89B9';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw the horizontal dashed line
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(endX, endY);
    ctx.lineTo(horizontalEndX, horizontalEndY);
    ctx.strokeStyle = '#CB89B9';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);

    // Positioning the percentage label
    const labelX = horizontalEndX + (middleAngle > 90 && middleAngle < 270 ? -20 : 10);
    const labelY = horizontalEndY - 5;

    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#CB89B9';
    ctx.fillText(`${percentage}%`, labelX, labelY);
  }, [percentage, startAngle, endAngle]);

  return (
    <canvas ref={canvasRef} className="adline" width="300" height="300" />
  );
};

const AudienceDemographics = () => {
  const [data, setData] = useState({
    labels: ['18-24 Age', '25-34 Age', '35-44 Age', '44+ Age'],
    datasets: [
      {
        data: [47, 25, 18, 10], // Percentage values for each age group
        backgroundColor: ['#4A90E2', '#CB89B9', '#52279B', '#6F42C1'],
        borderWidth: 8,
        borderColor: '#fff',
        hoverBorderColor: '#fff',
        fill: true,
        tension: 0.4,
        offset: 5,
      },
    ],
  });

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
    cutout: '50%',
    elements: {
      arc: {
        borderRadius: 30,
      },
    },
  };

  // Extract the percentages from the data
  const percentages = data.datasets[0].data;
  const totalAngle = 360;
  let startAngle = -90; // Start from the top
  const sectionAngles = percentages.map((percentage) => (percentage / 100) * totalAngle);
  const endAngles = sectionAngles.map((angle, index) => {
    const end = startAngle + angle;
    startAngle = end;
    return end;
  });

  return (
    <div className="section_card" style={{ width: '40%', margin: '0 auto', position: 'relative' }}>
      <div className="chart-header">
        <h3>Audience Demographics</h3>
      </div>

      {/* Render Doughnut chart */}
      <div className="chart-body" style={{ position: 'relative' }}>
        <Doughnut data={data} options={options} />
        
        {/* Render SectionLine components for each section */}
        {percentages.map((percentage, index) => {
          let startAngleForSection = index === 0 ? -90 : endAngles[index - 1];
          let endAngleForSection = endAngles[index];

          return (
            <SectionLine
              key={index}
              percentage={percentage}
              startAngle={startAngleForSection}
              endAngle={endAngleForSection}
            />
          );
        })}
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
