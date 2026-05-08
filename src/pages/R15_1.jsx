import React from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../styles/R15_1.css';

// Register standard Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const R15_1 = () => {
  const data = {
    labels: [
      'Information easy to Understand',
      'Contents Relevant to your Needs',
      'Information Provided',
    ],
    datasets: [
      {
        label: 'Average Rating',
        data: [4.4, 4.37, 4.38],
        backgroundColor: ['#F44336', '#FF9800', '#E91E63'],
        borderColor: ['#D32F2F', '#F57C00', '#C2185B'],
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Disables animations for instant loading
    scales: {
      y: {
        min: 4.36,
        max: 4.41,
        ticks: { stepSize: 0.005 },
        title: {
          display: true,
          text: 'Average Rating',
          font: { weight: 'bold' }
        }
      },
      x: {
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'RERA WEBSITE AVERAGE RATING',
        font: { size: 18, weight: 'bold' }
      }
    }
  };

  return (
    <div className="r15-container">
      <div className="breadcrumb-bar">
        You are here : <Link to="/" className="link">Home</Link> / 
        <Link to="/mis-reports" className="link">MIS Reports</Link> / R15.1 Rate of Website Graph
      </div>

      <div className="chart-content-box">
        {/* Manually placed rating label to match the image precisely */}
        <div className="chart-wrapper">
          <div className="chart-area">
            <Bar data={data} options={options} />
          </div>
        </div>
        
        <div className="legend-container">
          <h3>Website Rating</h3>
          <ul>
            <li><strong>4 to 5</strong> Outstanding</li>
            <li><strong>3 to 3.9</strong> Very Good</li>
            <li><strong>2 to 2.9</strong> Average</li>
            <li><strong>1 to 1.9</strong> Below Average</li>
            <li><strong>0 to 0.9</strong> Did not meet expectation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default R15_1;