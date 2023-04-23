import LoggedOutNavbar from './Navbar/LoggedOutNavbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <LoggedOutNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
