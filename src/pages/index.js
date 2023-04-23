import Head from 'next/head';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import LoggedOutNavbar from '@/components/Navbar/LoggedOutNavbar';
const Home = () => {
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

      <main className='flex flex-col w-screen h-screen p-2'>
        <div className='bg-green-300 w-full h-full'> sa dsadad</div>ß{' '}
      </main>
    </>
  );
};

export default Home;
