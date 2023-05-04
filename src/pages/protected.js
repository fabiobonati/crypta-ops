import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Protected = () => {
  const session = useSession();

  if (session.status === 'authenticated') {
    return <p>Signed in</p>;
  }

  return <Link href='/api/auth/signin'>Sign in</Link>;
};

export default Protected;
