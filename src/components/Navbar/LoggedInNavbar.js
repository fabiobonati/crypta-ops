import Link from 'next/link';

const LoggedInNavbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>Markets</Link>
        </li>
        <li>
          <Link href='/' >Pricing</Link>
        </li>
      </ul>
    </nav>
  );
};

export default LoggedInNavbar;
