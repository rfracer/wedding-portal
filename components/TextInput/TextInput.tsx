import React from 'react';
import FormMessage from '../FormMessage/FormMessage';
import styles from './TextInput.module.scss';

const TextInput = (props) => {
  const {
    id,
    name,
    placeholder,
    value,
    type,
    rows,
    label = '',
    register,
    required,
    autocomplete,
    errorMessage,
  } = props;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, { required })}
          id={id}
          rows={rows ? rows : 3}
          value={value}
          placeholder={placeholder}
          autoComplete={autocomplete ? autocomplete : 'on'}
          className={styles.textarea}
        />
      ) : (
        <input
          {...register(name, { required })}
          id={id}
          type={type ? type : 'text'}
          value={value}
          placeholder={placeholder}
          autoComplete={autocomplete ? autocomplete : 'on'}
          className={styles.input}
        />
      )}
      {errorMessage && <FormMessage type='error' message={errorMessage} />}
    </div>
  );
};

export default TextInput;
