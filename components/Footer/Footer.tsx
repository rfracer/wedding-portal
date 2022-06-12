import React from 'react';
import Link from 'next/link';
import Logo from '../../public/images/logo-white.svg';
import { IoPersonCircleOutline } from 'react-icons/io5';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className='container'>
        <div className={styles.innerWrapper}>
          <div>
            <Link href='/'>
              <a>
                <div className={styles.logoWrapper}>
                  <Logo className={styles.logo} />
                </div>
              </a>
            </Link>
          </div>
          <div>
            <Link href='/login'>
              <a>
                <div className={styles.loginLink}>
                  <IoPersonCircleOutline />
                  Zaloguj
                </div>
              </a>
            </Link>
          </div>
          <ul className={styles.linksList}>
            <li>
              <Link href='/'>Photography</Link>
            </li>
            <li>
              <Link href='/'>Music Band</Link>
            </li>
            <li>
              <Link href='/'>Music Band</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
