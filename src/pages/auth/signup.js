import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useRef } from 'react';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordCompatible, setPasswordCompatible] = useState(false);

  useEffect(() => {
    if (password !== passwordRepeat) {
      setPasswordCompatible(false);
    } else {
      setPasswordCompatible(true);
    }
  }, [passwordRepeat]);

  async function onSubmit(values) {
    console.log(passwordCompatible);
    if (!passwordCompatible) {
      return;
    }
    try {
      const body = { ...values };
      const res = await fetch(`/api/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 201) {
        reset();
      } else if (res.status === 409) {
        setError('emailRegistered', {
          type: 'manual',
          message: 'The email has already been registered!',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='h-screen w-screen'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <Image src='/logo.svg' width={230} height={50} alt='Logo' />
        <div className='flex flex-col items-center justify-center text-center'>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>
            Join us and start your journey!
          </h2>
          <div className='flex flex-col items-center justify-center mx-auto mt-8'>
            <form className='w-full mx-auto' onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-wrap mb-6'>
                <div className='w-full px-3 mb-6 md:mb-2'>
                  <input
                    className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:shadow-outline'
                    id='grid-first-name'
                    type='text'
                    placeholder='First Name'
                    {...register('name', { required: true })}
                  />
                </div>
                <div className='w-full px-3'>
                  <input
                    className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:shadow-outline'
                    id='grid-last-name'
                    type='text'
                    placeholder='Last Name'
                    {...register('surname', { required: true })}
                  />
                </div>
              </div>
              <div className='flex flex-wrap mb-6'>
                <div className='w-full px-3'>
                  <input
                    className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:shadow-outline'
                    id='grid-email'
                    type='email'
                    placeholder='Email'
                    {...register('email', {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                </div>
              </div>
              <div className='flex flex-wrap mb-6'>
                <div className='w-full px-3 mb-6 md:mb-2'>
                  <input
                    className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:shadow-outline'
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Password'
                    {...register('password', { required: true, minLength: 8 })}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='w-full px-3 text-center'>
                  <input
                    className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:shadow-outline '
                    id='password_repeat'
                    name='password_repeat'
                    type='password'
                    placeholder='Confirm Password'
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap mb-6'>
                <div className='w-full px-3 text-center text-red-500'>
                  {!passwordCompatible ? (
                    <p>Error matching the password</p>
                  ) : null}
                  {errors.emailRegistered && (
                    <p>{errors.emailRegistered.message}</p>
                  )}
                  {errors.email && <p>The email is not valid</p>}
                  {errors.password && (
                    <p>The password must be at least 8 characters</p>
                  )}
                </div>
              </div>

              <div className='flex flex-wrap mb-6'>
                <div className='w-full px-3'>
                  <input
                    className='w-full px-4 py-2 text-base font-semibold text-white transition duration-200 ease-in bg-pink-500 rounded-lg hover:bg-pink-400 focus:outline-none focus:shadow-outline'
                    type='submit'
                    value='Sign Up'
                  />
                </div>
              </div>
            </form>
          </div>
          <p className='mt-2 text-sm text-center text-gray-600'>
            Already have an account?{' '}
            <Link
              href='/auth/signin'
              className='font-medium text-pink-400 hover:text-pink-500'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
