import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Market = () => {
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    const fetchMarketData = async () => {
      const response = await fetch('https://api.coincap.io/v2/assets')
        .then((response) => response.json())
        .catch((error) => console.log('error', error));
      setCryptoData(response.data);
    };
    fetchMarketData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = cryptoData.length / 10;
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const itemsToShow = cryptoData.slice(startIndex, endIndex);
  return (
    <>
      <div className='flex flex-col justify-center w-full items-center m-6'>
        <table className='bg-gray-50 rounded-xl p-4 text-center'>
          <thead className='text-center'>
            <tr className='text-center'>
              <th className='p-4 text-left'>Name</th>
              <th className='p-4'>Price</th>
              <th className='p-4'>Trend 24h</th>
              <th className='p-4'>Market Cap</th>
              <th className='p-4'>Volume</th>
              <th className='p-4'>Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {itemsToShow.map((cryptoData, index) => (
              <tr
                key={index}
                className='border-t-2 border-gray-200 hover:bg-gray-100'
                data-href='/'
              >
                <td className='p-4 capitalize'>
                  <div className='flex flex-row text-left'>
                    <Image
                      src={'/logo.png'}
                      width={36}
                      height={36}
                      alt={cryptoData.id}
                      className='mr-2'
                    />
                    <div>
                      <p>{cryptoData.id}</p>
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
                      ? 'text-red-500'
                      : 'text-green-400'
                  }
                >
                  {parseFloat(cryptoData.changePercent24Hr).toFixed(2)}%
                </td>
                <td className='p-4'>
                  ${parseFloat(cryptoData.marketCapUsd).toFixed(2)}
                </td>
                <td className='p-4'>
                  ${parseFloat(cryptoData.volumeUsd24Hr).toFixed(2)}
                </td>
                <td className='p-4'>
                  ${parseFloat(cryptoData.vwap24Hr).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-center mt-4'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`mx-2 px-4 py-2 rounded-full ${
                  currentPage === pageNumber ? 'bg-pink-400 text-white' : ''
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
