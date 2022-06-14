import React from 'react';
import Image from 'next/image';
import styles from './CategoryListItem.module.scss';
import { IoWallet } from 'react-icons/io5';
import Link from 'next/link';

const CategoryItem = ({ image }) => {
  return (
    <div className={styles.wrapper}>
      <Image alt={'test'} src={image} width={500} height={350}></Image>
      <div className={styles.mainInfo}>
        <Link href={'/'}>
          <a>
            <h2 className={styles.companyTitle}>AleKadry - August Biadała</h2>
          </a>
        </Link>
        <span className={styles.companyCategory}>Photogrpahy</span>
        <p className={styles.companyDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          repellat excepturi tempora reprehenderit sunt eos nemo aperiam quod
          animi doloremqu.
        </p>
      </div>
      <div className={styles.additionalInfo}>
        <div className={styles.price}>
          <IoWallet className={styles.moneyIcon} /> 4000 zł
        </div>
        <Link href={'/'}>
          <a className='btn btn--outline'>VISIT</a>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
