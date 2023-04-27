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
  const [ID, setID] = useState('');
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('default');
  useEffect(() => {
    if (router.isReady) {
      // Code using query
      console.log(id);
      // this will set the state before component is mounted
      setID(id);
    }
  }, [router.isReady, id]);
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
  useEffect(() => {
    const fetchCryptoData = async () => {
      const res = await fetch(`https://api.coincap.io/v2/assets/${ID}`);
      const data = await res.json();
      setSelectedCrypto(data.data);
    };
    fetchCryptoData();
  }, [ID]);
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{selectedCrypto.name}</h1>
      <h1>{selectedCrypto.symbol}</h1>
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
