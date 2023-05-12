import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!session) {
      setIsLoading(true);
    }
    if (session) {
      setIsLoading(false);
    }
  }, [session]);
  return (
    <>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <h1>Dashboard</h1>
          <p>Hi, {session?.user?.email ?? 'friend'}!</p>
        </>
      )}
    </>
  );
};
export default Dashboard;
