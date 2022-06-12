import React, { useState } from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import LogoHome from '../../public/images/logo-white.svg';
import Logo from '../../public/images/logo-color.svg';
import { IoPersonCircleOutline } from 'react-icons/io5';

type Props = {
  home?: boolean;
};

const Navigation = ({ home }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='container'>
      <div className={`${styles.navWrapper} ${home ? styles.home : null}`}>
        <Link href='/'>
          <a>
            {home ? (
              <LogoHome className={styles.logo} />
            ) : (
              <Logo className={styles.logo} />
            )}
          </a>
        </Link>
        <Link href='/login'>
          <a>
            <div className={styles.userLoginLink}>
              <IoPersonCircleOutline />
              LOGIN
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
