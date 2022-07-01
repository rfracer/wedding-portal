import React from 'react';
import { Service } from '../../types/types';
import CategoryFormFilter from '../CategoryFormFilter/CategoryFormFilter';
import CategoryListItem from '../CategoryItem/CategoryListItem';
import styles from './CategoryList.module.scss';

type Props = {
  data: Service[];
  category: string;
};

const CategoryList = ({ data, category }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className='container'>
        <CategoryFormFilter category={category} />
        <p className={styles.resultsCount}>
          <span>
            Founded {data.length} {data.length === 1 ? 'service' : 'services'}
          </span>
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
