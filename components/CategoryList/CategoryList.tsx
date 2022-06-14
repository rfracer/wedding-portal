import React from 'react';
import CategoryListItem from '../CategoryItem/CategoryListItem';
import styles from './CategoryList.module.scss';

const CategoryList = ({ data }) => {
  {
    console.log(data);
  }
  return (
    <div className={styles.wrapper}>
      <div className='container'>
        <p className={styles.resultsCount}>
          Founded {data.length} {data.length === 1 ? 'service' : 'services'}
        </p>
        <div className={styles.itemsWrapper}>
          {data.map((company) => (
            <CategoryListItem key={company.id} data={company} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
