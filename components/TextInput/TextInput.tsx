import React from 'react';
import FormMessage from '../FormMessage/FormMessage';
import styles from './TextInput.module.scss';

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  type?: string;
  rows?: number;
  label: string;
  autocomplete?: string;
  register: any;
  errorMessage?: string;
  required?: boolean;
};

const TextInput = (props: Props) => {
  const {
    id,
    name,
    placeholder,
    value,
    type,
    rows,
    label = '',
    register,
    autocomplete,
    errorMessage = false,
    required = false,
  } = props;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, { required: required })}
          id={id}
          rows={rows ? rows : 3}
          value={value}
          placeholder={placeholder}
          autoComplete={autocomplete ? autocomplete : 'on'}
          className={styles.textarea}
          style={errorMessage ? { border: '1px solid #e53935' } : null}
        />
      ) : (
        <input
          {...register(name, { required: required })}
          id={id}
          type={type ? type : 'text'}
          value={value}
          placeholder={placeholder}
          autoComplete={autocomplete ? autocomplete : 'on'}
          className={styles.input}
          style={errorMessage ? { border: '1px solid #e53935' } : null}
        />
      )}
      {errorMessage ? (
        <FormMessage nofill type='error' message={errorMessage} />
      ) : null}
    </div>
  );
};

export default TextInput;
