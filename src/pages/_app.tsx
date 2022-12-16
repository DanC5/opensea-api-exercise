import { Montserrat } from '@next/font/google';

import { GlobalStyle } from '../styles/globalStyle';

import type { AppProps } from 'next/app';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={montserrat.className}>
      <GlobalStyle />
      <Component {...pageProps} />
    </main>
  );
}
