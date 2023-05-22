import LoggedOutNavbar from './Navbar/LoggedOutNavbar';
import Footer from './Footer';
import { useSession } from 'next-auth/react';
import LoggedInNavbar from './Navbar/LoggedInNavbar';
export default function Layout({ children }) {
  const { data: session } = useSession();
  return (
    <>
      <div className='flex flex-col h-screen'>
        {session ? <LoggedInNavbar /> : <LoggedOutNavbar />}
        <main className='flex-grow'>{children}</main>
        <Footer />
      </div>
    </>
  );
}
