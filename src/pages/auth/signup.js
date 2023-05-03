import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const SignUpForm = () => {
  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(values) {
    try {
      const body = { ...values };
      const res = await fetch(`/api/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  }

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
            {/* <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <input
                  className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:shadow-outline'
                  id='grid-password'
                  type='password'
                  placeholder='Confirm Password'
                />
              </div>
            </div> */}
            <div className='flex flex-wrap -mx-3 mb-6'>
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
  );
};

export default SignUpForm;
