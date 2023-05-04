//create a page and print sessaion details
import React from 'react';
import { useSession } from 'next-auth/react';

export default function MyPage() {
  const { data: session, status } = useSession();
  return (
    <>
      <h1>My page</h1>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'authenticated' && (
        <div>
          <p>Signed in as {session.user.email}</p>
          {console.log(session)}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
      {status === 'unauthenticated' && (
        <div>
          <p>Not signed in</p>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </>
  );
}
