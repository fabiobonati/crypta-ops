import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LoggedOutNavbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className='w-full shadow md:shadow-none bg-white md:top-0 md:sticky md:z-50 md:bg-opacity-50 md:backdrop-blur-md'>
      <div className='justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
        <div className='md:w-1/3'>
          <div className='flex items-center justify-between py-3 md:py-5'>
            <Link href='/'>
              <Image src='/logo.svg' width={230} height={50} alt='logo' />
            </Link>
            <div className='md:hidden'>
              <button
                className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className='md:w-1/3'>
          <div
            className={`justify-self-center pb-3 mt-6 md:flex md:pb-0 md:mt-0 w-full ${
              navbar ? 'flex' : 'hidden'
            }`}
          >
            <ul className='items-center justify-center w-full font-bold  space-y-8 md:flex md:space-x-6 md:space-y-0'>
              <li>
                <Link
                  href='/market'
                  className='py-2 px-4 hover:bg-slate-300 hover:rounded-full hover:bg-opacity-25'
                >
                  Market
                </Link>
              </li>
              <li>
                <Link
                  href='javascript:void(0)'
                  className='py-2 px-4 hover:bg-slate-300 hover:rounded-full hover:bg-opacity-25'
                >
                  Forum
                </Link>
              </li>
              <li>
                <Link
                  href='javascript:void(0)'
                  className='py-2 px-4 hover:bg-slate-300 hover:rounded-full hover:bg-opacity-25'
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='md:w-1/3'>
          <div
            className={`flex gap-4 justify-self-center md:justify-end pb-4 mt-4 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <ul className='mx-auto items-center justify-center  md:justify-end flex flex-row gap-4 md:space-x-6 md:space-y-0'>
              <li>
                <Link
                  href='/'
                  className='group  text-black transition-all duration-200 ease-in-out text-center bg-gray-100 hover:bg-gray-200 md:bg-transparent md:hover:bg-transparent rounded-full py-2 px-4'
                >
                  <span className='hidden md:block pb-1 bg-left-bottom bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-200 ease-out'>
                    Sign in
                  </span>
                  <span className='md:hidden'>Sign in</span>
                </Link>
              </li>
              <li>
                <Link
                  href='/auth/signup'
                  className='text-white bg-pink-500 rounded-full py-2 px-4 hover:bg-pink-600'
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoggedOutNavbar;
