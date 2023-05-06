import LoggedOutNavbar from './Navbar/LoggedOutNavbar';
import Footer from './Footer';
import { useSession } from 'next-auth/react';
import LoggedInNavbar from './Navbar/LoggedInNavbar';
export default function Layout({ children }) {
  const { data: session } = useSession();
  return (
    <>
      {session ? <LoggedInNavbar /> : <LoggedOutNavbar />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
