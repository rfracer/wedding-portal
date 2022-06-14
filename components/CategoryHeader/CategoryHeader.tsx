import React from 'react';
import styles from './CategoryHeader.module.scss';

const CategoryHeader = ({ name, backgroundImg }) => {
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
