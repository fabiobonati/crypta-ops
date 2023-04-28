import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
import { Line } from 'react-chartjs-2';
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
const symbolsArray = [
  'steth',
  'busd',
  'shib',
  'okb',
  'cro',
  'ldo',
  'near',
  'btcb',
  'ftm',
  'egld',
  'usdp',
  'flow',
  'cfx',
  'axs',
  'rpl',
  'hbar',
  'rndr',
  'klay',
  'inj',
  'mina',
  'fxs',
  'cspr',
  'xec',
  'gt',
  'cake',
  'ftt',
  'woo',
  'twt',
  'xdc',
  'rune',
  'agix',
  'kava',
  'dydx',
  'cvx',
  'fei',
  'rose',
  'mask',
  'dfi',
  'audio',
  'tfuel',
];

const MarketData = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ID, setID] = useState('');
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInterval, setSelectedInterval] = useState(1);
  useEffect(() => {
    if (router.isReady) {
      // Code using query
      console.log(id);
      // this will set the state before component is mounted
      setID(id);
    }
  }, [router.isReady, id]);

  const fetchDataInterval = async (id, interval, buttonInterval) => {
    const res = await fetch(
      `https://api.coincap.io/v2/assets/${id}/history?interval=${interval}`
    );
    const data = await res.json();
    setCryptoData(data.data);
    setSelectedInterval(buttonInterval);
  };

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
    <div className="p-6 lg:p-10">
      <div className="flex flex-col justify-center lg:flex-row lg:justify-between mb-6">
        <div className="flex flex-row justify-center lg:justify-normal w-full lg:w-auto text-xl">
          <div className="flex flex-col justify-center">
            <Image
              src={
                !symbolsArray.includes(crypto.symbol.toLowerCase())
                  ? `/cryptoLogo/${crypto.symbol.toLowerCase()}.svg`
                  : `/cryptoLogo/generic.svg`
              }
              width={75}
              height={57}
              alt={cryptoData.id}
              className="mr-6 lg:mr-2"
            />
          </div>
          <div className="flex flex-col gap-2 ml-6">
            <h1 className="text-2xl font-bold mt-4">{crypto.name}</h1>
            <h2 className="mb-5">{crypto.symbol}</h2>
          </div>
        </div>
        <div className="flex flex-col ml-4 gap-2 items-center">
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
        <div className="flex flex-col align-middle justify-center gap-2 w-full lg:w-auto">
          <button className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full mb-6 lg:mb-0">
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
      <div className="flex flex-row justify-around gap-4 text-white mt-6">
        <button
          onClick={() => fetchDataInterval(id, 'm1', 1)}
          className={`p-4 bg-pink-500 hover:bg-pink-600 rounded-full w-full h-full ${
            selectedInterval === 1 ? 'bg-pink-600' : 'bg-pink-500'
          }`}
        >
          1m
        </button>
        <button
          onClick={() => fetchDataInterval(id, 'm5', 2)}
          className={`p-4 bg-pink-500 hover:bg-pink-600 rounded-full w-full h-full ${
            selectedInterval === 2 ? 'bg-pink-600' : 'bg-pink-500'
          }`}
        >
          5m
        </button>
        <button
          onClick={() => fetchDataInterval(id, 'm30', 3)}
          className={`p-4 bg-pink-500 hover:bg-pink-600 rounded-full w-full h-full ${
            selectedInterval === 3 ? 'bg-pink-600' : 'bg-pink-500'
          }`}
        >
          30m
        </button>
        <button
          onClick={() => fetchDataInterval(id, 'h1', 4)}
          className={`p-4 bg-pink-500 hover:bg-pink-600 rounded-full w-full h-full ${
            selectedInterval === 4 ? 'bg-pink-600' : 'bg-pink-500'
          }`}
        >
          1h
        </button>
        <button
          onClick={() => fetchDataInterval(id, 'h12', 5)}
          className={`p-4 bg-pink-500 hover:bg-pink-600 rounded-full w-full h-full ${
            selectedInterval === 5 ? 'bg-pink-600' : 'bg-pink-500'
          }`}
        >
          12h
        </button>
        <button
          onClick={() => fetchDataInterval(id, 'd1', 6)}
          className={`p-4 bg-pink-500 hover:bg-pink-600 rounded-full w-full h-full ${
            selectedInterval === 6 ? 'bg-pink-600' : 'bg-pink-500'
          }`}
        >
          1d
        </button>
      </div>
    </div>
  );
};
export default MarketData;
