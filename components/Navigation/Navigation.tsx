import React, { useState } from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import Logo from '../../public/images/logo-white.svg';
import { IoPersonCircleOutline, IoCaretDown } from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import UserMenu from '../UserMenu/UserMenu';

type Props = {
  home?: boolean;
};

const Navigation = ({ home }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className={`${styles.navWrapper} ${home ? styles.home : null}`}>
      <div className='container'>
        <div className={styles.innerWrapper}>
          <Link href='/'>
            <a>
              <Logo className={styles.logo} />
            </a>
          </Link>
          {session ? (
            <div className={styles.userInfo}>
              <IoPersonCircleOutline />
              {session.user.name}
              <div className={styles.userMenuIcon}>
                <IoCaretDown />
              </div>
              <UserMenu />
            </div>
          ) : (
            <Link href='/login'>
              <a>
                <div className={styles.userLoginLink}>
                  <IoPersonCircleOutline />
                  LOGIN
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
