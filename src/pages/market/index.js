import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Market = () => {
  const [cryptoData, setCryptoData] = useState([]);
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchMarketData = async () => {
      const response = await fetch('https://api.coincap.io/v2/assets')
        .then((response) => response.json())
        .catch((error) => console.log('error', error));
      setCryptoData(response.data);
      setIsLoading(false);
    };
    fetchMarketData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = cryptoData.length / 10;
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const itemsToShow = cryptoData.slice(startIndex, endIndex);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className='flex flex-col justify-center w-2/3 h-full m-auto'>
        <Skeleton height={400} />
      </div>
    );
  }
  return (
    <>
      <div className='flex flex-col justify-center w-full container p-2 mx-auto items-center'>
        <div className='border-2 rounded-lg border-gray-100'>
          <table className='text-center mx-auto w-full'>
            <thead className='hidden border-b-2 border-gray-200 sm:table-header-group'>
              <tr className='text-center w-full min-w-full'>
                <th className='p-4 text-left'>Name</th>
                <th className='p-4'>Price</th>
                <th className='p-4'>Trend 24h</th>
                <th className='p-4'>Market Cap</th>
                <th className='p-4'>Volume</th>
                <th className='p-4 hidden md:table-cell'>Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {itemsToShow.map((cryptoData, index) => (
                <tr
                  key={index}
                  className=' hover:bg-gray-100 hover:cursor-pointer'
                  onClick={() => router.push(`/market/${cryptoData.id}`)}
                >
                  <td className='p-4 capitalize'>
                    <div className='flex flex-row text-left'>
                      <Image
                        src={
                          !symbolsArray.includes(
                            cryptoData.symbol.toLowerCase()
                          )
                            ? `/cryptoLogo/${cryptoData.symbol.toLowerCase()}.svg`
                            : `/cryptoLogo/generic.svg`
                        }
                        width={36}
                        height={36}
                        alt={cryptoData.id}
                        className='mr-2'
                      />
                      <div>
                        <p className='font-medium'>{cryptoData.id}</p>
                        <p className='text-gray-500'>{cryptoData.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className='p-4'>
                    ${parseFloat(cryptoData.priceUsd).toFixed(2)}
                  </td>
                  <td
                    className={
                      parseFloat(cryptoData.changePercent24Hr).toFixed(2) < 0
                        ? 'text-red-500 p-4'
                        : 'text-green-400 p-4'
                    }
                  >
                    {parseFloat(cryptoData.changePercent24Hr).toFixed(2)}%
                  </td>
                  <td className='p-4 hidden sm:table-cell'>
                    ${parseFloat(cryptoData.marketCapUsd).toFixed(2)}
                  </td>
                  <td className='p-4 hidden sm:table-cell'>
                    ${parseFloat(cryptoData.volumeUsd24Hr).toFixed(2)}
                  </td>
                  <td className='p-4 hidden md:table-cell'>
                    ${parseFloat(cryptoData.vwap24Hr).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex flex-wrap justify-center mt-4'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`mx-2 my-1 px-4 py-2 rounded-full ${
                  currentPage === pageNumber
                    ? 'bg-pink-400 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};
export default Market;
