import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { data } from 'autoprefixer';

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [userData, setUserData] = useState({});
  const [amount, setAmount] = useState();
  const [transactions, setTransactions] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [userCurrencies, setUserCurrencies] = useState([]);
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

  const { handleSubmit } = useForm();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
    if (session) {
      fetch('/api/user/', {
        method: 'GET',
      })
        .then((res) => {
          if (res.status === 401) {
            router.push('/');
          }
          return res.json();
        })
        .then((data) => {
          setUserData(data.user);
          setWallet(data.user.Wallet);
          fetch('/api/transactions/', {
            method: 'GET',
          })
            .then((res) => {
              if (res.status === 401) {
                router.push('/');
              }
              return res.json();
            })
            .then((data) => {
              setTransactions(data);
              setUserCurrencies(Object.keys(data));
              fetch('/api/wallet').th;
              fetchMarketData();
              setIsLoading(false);
            });
        });
    }
  }, []);

  const onSubmit = async () => {
    try {
      const body = { userId: userData.id, startingAmount: amount };
      const res = await fetch(`/api/wallet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 201) {
        console.log('Wallet created!');
        const wallet = await res.json();
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //call to COINCAP APIs to get data about crypto
  const fetchMarketData = async () => {
    try {
      const response = await fetch('https://api.coincap.io/v2/assets');
      const data = await response.json();
      setCryptoData(data.data);
    } catch (error) {
      console.log('Error fetching market data:', error);
    }
  };

  //function that calculates the total amount owned for a currency
  const calculateTotalAmount = (currency) => {
    const transactionsPerCurrency = transactions[currency];
    let totalAmount = 0;
    transactionsPerCurrency.forEach((transaction) => {
      if (transaction.type === 'purchase') {
        totalAmount += transaction.amount;
      } else if (transaction.type === 'sale') {
        totalAmount -= transaction.amount;
      }
    });
    return totalAmount;
  };

  return (
    <>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className='p-4 flex flex-col gap-6'>
          {!wallet ? (
            <div className='flex flex-col items-center justify-center mx-auto border-dashed border-2 border-gray-300 rounded-md p-8'>
              <h1 className='text-2xl font-bold'>Create your wallet</h1>
              <form
                className='w-full mx-auto'
                onSubmit={handleSubmit(onSubmit)}
              >
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
                      min={50}
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
                      value='Create'
                    />
                  </div>
                </div>
                <div className='border-solid border-2 border-red-500 rounded-lg bg-red-200 p-4 text-center'>
                  <p className='text-sm text-red-600'>
                    You need to create a wallet to start trading. <br /> You can
                    add a minimum of 50$.
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h1 className='text-2xl font-semibold text-center'>
                Welcome back {userData.name}!
              </h1>
              <div className='flex flex-row gap-4 justify-between'>
                <p className='text-2xl font-medium flex items-center'>
                  <span className='font-semibold'>Your assets:&nbsp;</span>
                  {amount}€
                </p>
              </div>
            </div>
          )}
          <div className='border-2 rounded-lg border-gray-100'>
            <table className='text-center mx-auto w-full'>
              <thead className='hidden border-b-2 border-gray-200 sm:table-header-group'>
                <tr className='text-center w-full min-w-full'>
                  <th className='p-4'>Name</th>
                  <th className='p-4'>Balance</th>
                  <th className='p-4'>Market Price</th>
                </tr>
              </thead>
                <tbody>
                  
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
