import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import FormMessage from '../FormMessage/FormMessage';
import styles from './CategoryFormFilter.module.scss';

type Props = {
  category: string;
};

const CategoryFormFilter = ({ category }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
  } = useForm();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: 0,
      padding: 3,
      paddingLeft: 10,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#bf9b30',
    }),
  };

  const optionsServices = [
    { value: 'photography', label: 'Photography' },
    { value: 'wedding-hall', label: 'Hall' },
    { value: 'music-band', label: 'Music Band' },
  ];

  const optionsCities = [
    { value: 'kalisz', label: 'Kalisz' },
    { value: 'poznan', label: 'Poznań' },
    { value: 'warszawa', label: 'Warszawa' },
  ];

  const filterHandler = (data) => {
    router.push({
      pathname: data.service.value,
      query: { city: data.city ? data.city.value : null },
    });
  };
  console.log(router.pathname);
  return (
    <form onSubmit={handleSubmit(filterHandler)} className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.selectFilterWrapper}>
          <Controller
            name='service'
            control={control}
            render={({ field }) => (
              <Select
                isClearable
                placeholder='Select service'
                styles={customStyles}
                {...field}
                options={optionsServices}
                defaultValue={optionsServices.filter(
                  (option) => option.value === category
                )}
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name='city'
            control={control}
            render={({ field }) => (
              <Select
                isClearable
                placeholder='Select city'
                styles={customStyles}
                {...field}
                options={optionsCities}
                defaultValue={optionsCities.filter(
                  (option) => option.value === router.query.city
                )}
              />
            )}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <input className='btn btn--fullwidth' type='submit' value='SEARCH' />
        </div>
      </div>
      {(errors.service || errors.city) && isSubmitted ? (
        <FormMessage message={'Please select all fields'} type={'error'} />
      ) : null}
    </form>
  );
};

export default CategoryFormFilter;
