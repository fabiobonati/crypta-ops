import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const SignIn = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const { session } = useSession();

  const onSubmit = async (values) => {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/testsessione',
    });

    /* if (result.error) {
      reset();
      alert(result.error);
    } */
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <Image
        src='/logo.svg'
        width={230}
        height={50}
        alt='Logo'
        className='mt-6'
      />
      <div className='flex flex-col items-center justify-center'>
        <h2 className='mt-6 text-3xl font-bold text-center text-gray-900'>
          Join us and start your journey!
        </h2>

        <div className='flex flex-col items-center justify-center w-full mt-8'>
          <form className='w-full max-w-sm' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3 mb-6 md:mb-2'></div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <input
                  className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:shadow-outline'
                  id='grid-email'
                  type='email'
                  placeholder='Email'
                  {...register('email', { required: true })}
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <input
                  className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:shadow-outline'
                  id='grid-password'
                  type='password'
                  placeholder='Password'
                  {...register('password', { required: true })}
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <input
                  className='w-full px-4 py-2 text-base font-semibold text-white transition duration-200 ease-in bg-pink-500 rounded-lg hover:bg-pink-400 focus:outline-none focus:shadow-outline'
                  type='submit'
                  value='Sign In'
                />
              </div>
            </div>
          </form>
        </div>
        <p className='mt-2 text-sm text-center text-gray-600'>
          {"Don't have an account?"}{' '}
          <Link
            href='/auth/signup'
            className='font-medium text-pink-400 hover:text-pink-500'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
