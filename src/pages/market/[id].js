import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Chart as ChartS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
// 2. Register them
ChartS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);
import { Line } from 'react-chartjs-2';
const MarketData = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cryptoData, setCryptoData] = useState([]);

  const data = {
    labels: cryptoData.map(
      (data) =>
        `${new Date(data.date).getHours()}:${new Date(data.date).getMinutes()}`
    ),
    datasets: [
      {
        label: 'Price',
        data: cryptoData.map((data) => data.priceUsd),
        fill: true,
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderColor: 'rgba(255, 215, 0, 0.9)',
      },
    ],
  };
  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.coincap.io/v2/assets/${id}/history?interval=m1`
      );
      const data = await res.json();
      setCryptoData(data.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="p-6">
      <Line
        data={data}
        width={200}
        height={100}
        options={options}
        className="w-full h-full"
      />
    </div>
  );
};

export default MarketData;
