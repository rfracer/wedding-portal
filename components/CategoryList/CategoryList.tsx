import React from 'react';
import CategoryListItem from '../CategoryItem/CategoryListItem';
import styles from './CategoryList.module.scss';

const CategoryList = () => {
  return (
    <div className={styles.wrapper}>
      <div className='container'>
        <p className={styles.resultsCount}>Founded 22 services</p>
        <div className={styles.itemsWrapper}>
          <CategoryListItem image={'/images/photography-category.jpg'} />
          <CategoryListItem image={'/images/photography-category.jpg'} />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
