import React from 'react';
import styles from './CategoryHeader.module.scss';

type Props = {
  name: string;
  backgroundImg: string;
};

const CategoryHeader = ({ name, backgroundImg }: Props) => {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImg})` }}
      className={styles.wrapper}
    >
      <h1 className={styles.heading}>{name}</h1>
    </div>
  );
};

export default CategoryHeader;
