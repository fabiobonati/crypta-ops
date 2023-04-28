import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const needsLayout = !router.pathname.startsWith('/auth');
  const LayoutComponent = needsLayout ? Layout : React.Fragment;
  return (
    <SessionProvider session={pageProps.session}>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </SessionProvider>
  );
}
