import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email: userInfo.email,
      password: userInfo.password,
    });
    console.log(res);
  };
  return (
    <div>
      <form method='POST' onSubmit={handleSubmit}>
        <inpyt type='email' placeholder='email' value={userInfo.email} />
        <inpyt
          type='password'
          placeholder='password'
          value={userInfo.password}
          onchange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
        />
        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default SignIn;
