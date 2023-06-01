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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useForm } from 'react-hook-form';
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
import { useSession } from 'next-auth/react';
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
  'celo',
];

const MarketData = () => {
  const session = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [ID, setID] = useState('');
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInterval, setSelectedInterval] = useState(1);
  const [amount, setAmount] = useState(0);
  const [amountToSell, setAmountToSell] = useState(0);
  const [typeOfTransaction, setTypeOfTransaction] = useState('purchase');
  const { handleSubmit } = useForm();
  useEffect(() => {
    if (router.isReady) {
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
    let isMounted = true;

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
  };
  //make the post req to the transaction api
  const onSubmit = async () => {
    const body = {
      amount: amount !== 0 ? amount : amountToSell,
      currency: crypto.name.toLowerCase(),
      email: session.data.user.email,
      type: amount > 0 ? 'purchase' : 'sale',
    };
    console.log(body);
    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (response.status === 201) {
      console.log('success');
    }
  };

  if (isLoading) {
    return (
      <div className='p-6 lg:p-10'>
        <div className='flex flex-col justify-center lg:flex-row lg:justify-between mb-6'>
          <div className='flex flex-row justify-center lg:justify-normal w-full lg:w-auto text-xl'>
            <div className='flex flex-col justify-center'>
              <Skeleton width={75} height={57} widthclassName='mr-6 lg:mr-2' />
            </div>
            <div className='flex flex-col gap-2 ml-6'>
              <Skeleton height={30} width={100} />
              <Skeleton height={30} width={100} />
            </div>
          </div>
          <div className='flex flex-col ml-4 gap-2 items-center'>
            <Skeleton height={30} width={100} />
            <Skeleton height={30} width={100} />
          </div>
          <div className='flex flex-col align-middle justify-center gap-2 w-full lg:w-auto'>
            <Skeleton height={30} width={100} />
          </div>
        </div>
        <Skeleton height={500} />
      </div>
    );
  }
  return (
    <div className='p-6 lg:p-10'>
      <div className='flex flex-col justify-center lg:flex-row lg:justify-between mb-6'>
        <div className='flex flex-row justify-center lg:justify-normal w-full lg:w-auto text-xl'>
          <div className='flex flex-col justify-center'>
            <Image
              src={
                !symbolsArray.includes(crypto.symbol.toLowerCase())
                  ? `/cryptoLogo/${crypto.symbol.toLowerCase()}.svg`
                  : `/cryptoLogo/generic.svg`
              }
              width={75}
              height={75}
              alt={cryptoData}
              className='mr-6 lg:mr-2'
            />
          </div>
          <div className='flex flex-col gap-2 ml-6'>
            <h1 className='text-2xl font-bold mt-4'>{crypto.name}</h1>
            <h2 className='mb-5'>{crypto.symbol}</h2>
          </div>
        </div>
        <div className='flex flex-col ml-4 gap-2 items-center'>
          <h1 className='text-2xl font-bold mt-4'>
            ${parseFloat(crypto.priceUsd).toFixed(2)}
          </h1>
          <h2 className='mb-5'>
            {crypto.changePercent24Hr > 0 ? (
              <span className='text-green-500'>
                {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
              </span>
            ) : (
              <span className='text-red-500'>
                {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
              </span>
            )}
          </h2>
        </div>
        <div className='flex flex-col align-middle justify-center gap-2 w-full lg:w-auto'>
          <button className='bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full mb-6 lg:mb-0'>
            Buy now!
          </button>
        </div>
      </div>
      <Line
        data={data}
        width={200}
        height={75}
        options={options}
        className='w-full h-full'
      />
      <div className='flex flex-row justify-around gap-4 text-white mt-6'>
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
      {session ? (
        <div>
          <form className='w-full mx-auto' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3 mb-6 md:mb-2'></div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <input
                  className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:shadow-outline'
                  id='grid-amount'
                  type='number'
                  placeholder='50$'
                  required={true}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <input
                  className='w-full px-4 py-2 text-base font-semibold text-white transition duration-200 ease-in bg-pink-500 rounded-lg hover:bg-pink-400 focus:outline-none focus:shadow-outline'
                  type='submit'
                  value='Buy'
                />
              </div>
            </div>
          </form>
          <hr></hr>
          <form className='w-full mx-auto' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3 mb-6 md:mb-2'></div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <input
                  className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:shadow-outline'
                  id='grid-amount'
                  type='number'
                  placeholder='50$'
                  required={true}
                  onChange={(e) => setAmountToSell(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <input
                  className='w-full px-4 py-2 text-base font-semibold text-white transition duration-200 ease-in bg-pink-500 rounded-lg hover:bg-pink-400 focus:outline-none focus:shadow-outline'
                  type='submit'
                  value='Sell'
                />
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};
export default MarketData;
