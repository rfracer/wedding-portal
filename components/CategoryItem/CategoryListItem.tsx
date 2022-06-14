import React from 'react';
import Image from 'next/image';
import styles from './CategoryListItem.module.scss';
import { IoWallet } from 'react-icons/io5';
import Link from 'next/link';

type Props = {};

const CategoryItem = ({ data }) => {
  const {
    id,
    name,
    category,
    city,
    phone,
    email,
    photoURL,
    website,
    about,
    price,
  } = data;
  return (
    <div className={styles.wrapper}>
      <Image alt={'test'} src={photoURL} width={500} height={350} />
      <div className={styles.mainInfo}>
        <Link href={`/company/${id}`}>
          <a>
            <h2 className={styles.companyTitle}>{name}</h2>
          </a>
        </Link>
        <span className={styles.companyCategory}>{category}</span>
        <p className={styles.companyDescription}>{about}</p>
      </div>
      <div className={styles.additionalInfo}>
        <div className={styles.price}>
          <IoWallet className={styles.moneyIcon} /> {price} zł
        </div>
        <Link href={`/company/${id}`}>
          <a className='btn btn--outline'>VISIT</a>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
