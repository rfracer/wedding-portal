import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import Layout from '../components/Layout/Layout';
import Logo from '../public/images/logo-color.svg';
import styles from '../styles/pages/Login.module.scss';

import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && status !== 'loading') {
      router.push('/');
    }
  }, [session, status, router]);

  const handleGithubLogin = async (e) => {
    e.preventDefault();
    await signIn('github', {
      callbackUrl: `${window.location.origin}`,
    });
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    await signIn('google', {
      callbackUrl: `${window.location.origin}`,
    });
  };

  if (status === 'loading') {
    return <>Loading...</>;
  }

  return (
    <>
      <Head>
        <title>MYDREAMDAY | Login</title>
        <meta name='description' content='Wedding portal | Login' />
      </Head>
      <Layout>
        <div className={styles.wrapper}>
          <Logo className={styles.logo} />
          <form className={styles.form}>
            <div className={styles.formControl}>
              <label htmlFor='email' className={styles.formLabel}>
                EMAIL
              </label>
              <input
                className={styles.formInput}
                type='email'
                name='email'
                id='email'
                placeholder='ENTER EMAIL'
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor='password' className={styles.formLabel}>
                PASSWORD
              </label>

              <input
                className={styles.formInput}
                type='password'
                name='password'
                id='password'
                placeholder='PASSWORD'
                required
              />
            </div>
            <div className={styles.buttonWrapper}>
              <input className='btn' type='submit' value='SIGN IN' />
            </div>
          </form>
          <div className={styles.providerWrapper} onClick={handleGithubLogin}>
            <Image
              src='/images/github-icon.png'
              className={styles.providerIcon}
              alt='Github icon'
              width={26}
              height={26}
            />
            <p className={styles.providerLabel}>Continue with GitHub</p>
          </div>
          <div className={styles.providerWrapper} onClick={handleGoogleLogin}>
            <Image
              src='/images/google-icon.png'
              className={styles.providerIcon}
              alt='Github icon'
              width={26}
              height={26}
            />
            <p className={styles.providerLabel}>Continue with GitHub</p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
