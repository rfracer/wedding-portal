import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useSession, signIn } from 'next-auth/react';
import Layout from '../components/Layout/Layout';
import Logo from '../public/images/logo-color.svg';
import styles from '../styles/pages/Login.module.scss';
import FormMessage from '../components/FormMessage/FormMessage';

import { useRouter } from 'next/router';
import Spinner from '../components/Spinner/Spinner';
import Button from '../components/Button/Button';
import { UserAuth } from '../types/types';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuth>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const handleLogin = async (data: UserAuth) => {
    setLoading(true);
    const { error, status } = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (error) {
      status === 401
        ? setError('Invalid email or password')
        : setError('Server error - contact page admin');
      setLoading(false);
    } else {
      router.push(window.location.origin);
    }
  };

  useEffect(() => {
    if (session && status !== 'loading') {
      router.push('/');
      setLoading(false);
    }
  }, [session, status, router]);

  const handleGithubLogin = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    await signIn('github', {
      callbackUrl: `${window.location.origin}`,
    });
  };

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    await signIn('google', {
      callbackUrl: `${window.location.origin}`,
    });
  };

  if (status === 'loading') {
    return <Spinner />;
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
          <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
            <div className={styles.errorsWrapper}>
              {errors.email && (
                <FormMessage
                  type='error'
                  message={
                    errors.email.message
                      ? errors.email.message
                      : 'Please fill email field'
                  }
                />
              )}
              {errors.password && (
                <FormMessage
                  type='error'
                  message={
                    errors.password.message
                      ? errors.password.message
                      : 'Please fill password field'
                  }
                />
              )}
              {error && <FormMessage type='error' message={error} />}
            </div>
            <div className={styles.formControl}>
              <label htmlFor='email' className={styles.formLabel}>
                EMAIL
              </label>
              <input
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={styles.formInput}
                type='email'
                name='email'
                id='email'
                placeholder='ENTER EMAIL'
                style={errors.email ? { border: '1px solid #ffa726' } : null}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor='password' className={styles.formLabel}>
                PASSWORD
              </label>

              <input
                {...register('password', {
                  required: true,
                })}
                className={styles.formInput}
                type='password'
                name='password'
                id='password'
                placeholder='PASSWORD'
                style={errors.password ? { border: '1px solid #ffa726' } : null}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <Button type='submit'>SIGN IN</Button>
            </div>
          </form>
          <div className={styles.providerWrapper} onClick={handleGoogleLogin}>
            <Image
              src='/images/google-icon.png'
              className={styles.providerIcon}
              alt='Github icon'
              width={26}
              height={26}
            />
            <p className={styles.providerLabel}>Continue with Google</p>
          </div>
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
        </div>
      </Layout>
    </>
  );
};

export default Login;
