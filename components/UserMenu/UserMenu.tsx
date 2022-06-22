import Link from 'next/link';
import styles from './UserMenu.module.scss';
import { signOut } from 'next-auth/react';
import { IoLogOutOutline, IoAddCircleOutline } from 'react-icons/io5';

const UserMenu = ({ status }) => {
  return (
    <>
      {status && (
        <div className={styles.wrapper}>
          <ul className={styles.userMenuList}>
            <Link href='/profile/add'>
              <a>
                <li>
                  <IoAddCircleOutline /> ADD SERVICE
                </li>
              </a>
            </Link>
            <li onClick={() => signOut()}>
              <IoLogOutOutline /> LOGOUT
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserMenu;
