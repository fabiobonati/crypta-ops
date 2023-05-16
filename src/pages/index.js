import Head from 'next/head';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session != null || session != undefined) {
      router.push('/dashboard');
    }
  }, [session]);
  return (
    <>
      <Head>
        <title>CryptaOps</title>
        <meta
          name='description'
          content='Demo platform for exchanging cryptocurrency for free.'
        />
        <meta name='keywords' content='crypto, trading, demo' />
        <meta name='author' content='Fabio Bonati, Diego Cividini' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='canonical' href='https://www.cryptaops.it/' />
      </Head>

      <main className='absolute flex flex-col top-0 w-[100vw] h-[100vh] p-2 justify-center items-center text-center gap-12 bg-gradient-to-tr from-pink-200 via-pink-100 to-neutral-100'>
        <h1 className='text-xl md:text-4xl font-semibold leading-loose'>
          CryptaOps: the newest way to train yourself into crypto <br /> without
          touching your wallet
        </h1>
        <h3 className='text-xl'>
          Create a free account here to start trading!
        </h3>
        <Link
          href='/auth/signup'
          className='bg-pink-500 rounded-full px-4 py-2 text-white'
        >
          <p className='text-lg md:text-2xl font-semibold '>Sign up now!</p>
        </Link>
      </main>
    </>
  );
};

export default Home;
