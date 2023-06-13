import React from 'react';
import Head from 'next/head';

import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>ParkC</title>
        <meta
          name="description"
          content="Create mapping apps with Next.js Leaflet Starter"
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
