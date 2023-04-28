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
  const [selectedCrypto, setSelectedCrypto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
    let isMounted = true; // flag to track component mount state

    async function fetchCryptoData() {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${ID}`);
        const data = await response.json();
        if (isMounted) {
          setSelectedCrypto(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setSelectedCrypto({});
        }
      }
    }

    fetchCryptoData();

    return () => {
      isMounted = false; // set flag to false on unmount
    };
  }, [ID]);
  const crypto = selectedCrypto;
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
        backgroundColor: 'rgba(233, 30, 99, 0.2)',
        borderColor: 'rgba(233, 30, 99, 0.9)',
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
    plugins: {
      legend: {
        display: false,
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <div className="flex flex-row justify-around">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold mt-4">{crypto.name}</h1>
          <h2 className="mb-5">{crypto.symbol}</h2>
        </div>
        <div className="flex flex-col ml-4 gap-2">
          <h1 className="text-2xl font-bold mt-4">
            ${parseFloat(crypto.priceUsd).toFixed(2)}
          </h1>
          <h2 className="mb-5">
            {crypto.changePercent24Hr > 0 ? (
              <span className="text-green-500">
                {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
              </span>
            ) : (
              <span className="text-red-500">
                {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
              </span>
            )}
          </h2>
        </div>
        <div className="flex flex-col align-middle justify-center gap-2">
          <button className="bg-pink-500 text-white p-4 rounded-full">
            Buy now!
          </button>
        </div>
      </div>
      <Line
        data={data}
        width={200}
        height={75}
        options={options}
        className="w-full h-full"
      />
    </div>
  );
};
export default MarketData;
