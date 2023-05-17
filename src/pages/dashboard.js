import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [userData, setUserData] = useState({});
  const [amount, setAmount] = useState();
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
          setIsLoading(false);
        });
    }
  }, [session, router]);

  const onSubmit = async () => {
    try {
      const body = { userId: userData.id, startingAmount: amount };
      console.log(body);
      const res = await fetch(`/api/wallet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 201) {
        console.log('Wallet created!');
        const transaction = await res.json();
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
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
                      placeholder='50+'
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
              </form>
            </div>
          ) : (
            <div>
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
        </div>
      )}
    </>
  );
};
export default Dashboard;
