import { useSession } from 'next-auth/react';

const Protected = () => {
  const session = useSession();

  if (session.status === 'authenticated') {
    return <p>Signed in</p>;
  }

  return <a href='/api/auth/signin'>Sign in</a>;
};

export default Protected;
