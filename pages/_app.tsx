import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color='#29D'
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow={true}
      />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
