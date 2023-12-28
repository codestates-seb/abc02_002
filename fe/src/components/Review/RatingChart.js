import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Common } from "../../styles/common";
Chart.register(...registerables);

const RatingChart = ({ ratings }) => {
  const maxCount = Math.max(...ratings);
  const backgroundColors = ratings.map((count) =>
    count === maxCount
      ? `${Common.colors.theme}`
      : `${Common.colors.brightTheme}`
  );

  const data = {
    labels: ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"],
    datasets: [
      {
        data: ratings,
        backgroundColor: backgroundColors,
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 20, // 막대 두께 조절
        categoryPercentage: 0.9, // 막대 너비 조절
      },
    ],
  };

  const options = {
    // responsive: true,
    // maintainAspectRatio: false,
    indexAxis: "x", // 막대 그래프의 방향을 가로로 설정
    plugins: {
      tooltip: {
        enabled: false, // 툴팁 비활성화
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false, // y축 레이블 숨기기
      },
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          display: false, // 격자무늬 제거
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RatingChart;
