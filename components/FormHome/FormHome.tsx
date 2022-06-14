import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './FormHome.module.scss';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Logo from '../../public/images/logo-color.svg';
import FormMessage from '../FormMessage/FormMessage';
import { SearchHomeForm } from '../../types/types';

const FormHome = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
  } = useForm();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: 50,
      padding: 3,
      paddingLeft: 10,
      marginBottom: 15,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#bf9b30', // Custom colour
    }),
  };

  const optionsServices = [
    { value: 'photography', label: 'Photography' },
    { value: 'hall', label: 'Hall' },
    { value: 'band', label: 'Music Band' },
  ];

  const optionsCities = [
    { value: 'kalisz', label: 'Kalisz' },
    { value: 'poznań', label: 'Poznań' },
    { value: 'warszawa', label: 'Warszawa' },
  ];

  const searchHandler = (data) => {
    router.push({
      pathname: data.service.value,
      query: { city: data.city.value },
    });
  };

  return (
    <form onSubmit={handleSubmit(searchHandler)} className={styles.wrapper}>
      <Logo className={styles.logo} />
      <p className={styles.paragraph}>Make this day special</p>
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
          />
        )}
        rules={{ required: true }}
      />
      <div className={styles.buttonWrapper}>
        <input
          className='btn btn--fullwidth btn--outline'
          type='submit'
          value='SEARCH'
        />
      </div>
      {(errors.service || errors.city) && isSubmitted ? (
        <FormMessage message={'Please select all fields'} type={'error'} />
      ) : null}
    </form>
  );
};

export default FormHome;
