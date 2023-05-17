import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState(0);
  const [userData, setUserData] = useState({});

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
          setIsLoading(false);
        });
    }
  }, [session, router]);
  return (
    <>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className='p-4 flex flex-col gap-6'>
          <h1 className='text-2xl font-semibold'>Hi, {userData.name}</h1>
          <p className='text-lg font-medium'>
            This is your dashboard, here you can see your profile and your
            statistics.
          </p>
          <div className='flex flex-row gap-4 justify-between'>
            <p className='text-2xl font-medium flex items-center'>
              <span className='font-semibold'>Wallet:&nbsp;</span>
              {wallet ? wallet.startingAmount : null}€
            </p>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Buy crypto
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
