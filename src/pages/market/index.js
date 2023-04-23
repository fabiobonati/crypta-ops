import React, { useState, useEffect, Fragment } from "react";
import LoggedOutNavbar from "@/components/Navbar/LoggedOutNavbar";

const Market = () => {
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const fetchMarketData = async () => {
      const response = await fetch("https://api.coincap.io/v2/assets")
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
      setCryptoData(response.data);
    };
    fetchMarketData();
  }, []);
  return (
    <>
      <LoggedOutNavbar />
      <div className="flex flex-col justify-center w-full items-center m-2">
        <table className="bg-slate-300 rounded-xl p-4 text-center">
          <thead className="text-center">
            <tr className="text-center">
              <th className="p-4">Name</th>
              <th className="p-4">Symbol</th>

              <th className="p-4">Price</th>
              <th className="p-4">24h</th>
              <th className="p-4">Market Cap</th>
              <th className="p-4">Volume</th>
              <th className="p-4">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((cryptoData, index) => (
              <tr key={index}>
                <td className="p-4 capitalize">{cryptoData.id}</td>
                <td className="p-4">{cryptoData.symbol}</td>
                <td className="p-4">
                  ${parseFloat(cryptoData.priceUsd).toFixed(2)}
                </td>
                <td className="p-4">
                  ${parseFloat(cryptoData.changePercent24Hr).toFixed(2)}
                </td>
                <td className="p-4">
                  ${parseFloat(cryptoData.marketCapUsd).toFixed(2)}
                </td>
                <td className="p-4">
                  ${parseFloat(cryptoData.volumeUsd24Hr).toFixed(2)}
                </td>
                <td className="p-4">
                  ${parseFloat(cryptoData.vwap24Hr).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Market;
