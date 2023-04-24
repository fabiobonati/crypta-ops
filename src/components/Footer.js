import Link from 'next/link';
import { FaDiscord, FaInstagram, FaTelegram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='p-6 mt-12 bg-gray-50'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-row space-x-24'>
          <div>
            <p className='font-medium text-xl'>About us</p>
            <ul className='text-gray-500 space-y-1 mt-3'>
              <li>
                <Link href='/'>About</Link>
              </li>
              <li>
                <Link href='/'>Terms</Link>
              </li>
              <li>
                <Link href='/'>Privacy</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='font-medium text-xl'>Support</p>
            <ul className='text-gray-500 space-y-1 mt-3'>
              <li>
                <Link href='/'>APIs</Link>
              </li>
              <li>
                <Link href='/'>Request a Feature</Link>
              </li>
              <li>
                <Link href='/'>Support Center</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='font-medium text-xl'>Community</p>
            <div className='flex flex-row text-xl mt-3 space-x-6'>
              <FaDiscord
                className='text-gray-500 hover:text-gray-800'
                href=''
              />
              <FaTelegram
                className='text-gray-500 hover:text-gray-800'
                href=''
              />
              <FaInstagram
                className='text-gray-500 hover:text-gray-800'
                href=''
              />
              <FaEnvelope
                className='text-gray-500 hover:text-gray-800'
                href=''
              />
            </div>
          </div>
        </div>
        <hr className='w-1/2 h-px mx-auto my-6 bg-gray-300 border-0' />
        <div className='flex flex-col items-center text-center'>
          <p>
            Made with ❤️ by <strong>CryptaOps</strong> Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
