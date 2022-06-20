import Link from 'next/link';
import styles from './UserMenu.module.scss';
import { signOut } from 'next-auth/react';

const UserMenu = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.userMenuList}>
        <li onClick={() => signOut()}>LOGOUT</li>
      </ul>
    </div>
  );
};

export default UserMenu;
