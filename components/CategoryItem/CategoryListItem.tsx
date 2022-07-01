import React from 'react';
import Image from 'next/image';
import styles from './CategoryListItem.module.scss';
import { IoWallet } from 'react-icons/io5';
import { Service } from '../../types/types';
import Link from 'next/link';

type Props = {
  data: Service;
};

const CategoryItem = ({ data }: Props) => {
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
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={photoURL}
          alt={name}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>
      <div className={styles.mainInfo}>
        <Link href={`/service/${id}`}>
          <a>
            <h2 className={styles.companyTitle}>{name}</h2>
          </a>
        </Link>
        <span className={styles.companyCategory}>{category}</span>
        <p className={styles.companyDescription}>{about}</p>
      </div>
      <div className={styles.additionalInfo}>
        <div className={styles.price}>
          <IoWallet className={styles.moneyIcon} /> {`${price} $`}
          {category === 'hall' && '/person'}
        </div>
        <Link href={`/company/${id}`}>
          <a className='btn btn--outline'>VISIT</a>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
