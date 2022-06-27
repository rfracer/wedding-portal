import Select from 'react-select';
import { Control } from 'react-hook-form';
import styles from './SelectInput.module.scss';
import { Controller } from 'react-hook-form';
import FormMessage from '../FormMessage/FormMessage';
import { Service } from '../../types/types';

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  label: string;
  autocomplete?: string;
  errorMessage?: string;
  control: Control<Service, any>;
  options: OptionType[];
};

type OptionType = {
  value: string;
  label: string;
};

const SelectInput = ({
  id,
  label,
  name,
  options,
  control,
  placeholder,
  errorMessage,
}: Props) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: 5,
      padding: 0,
      paddingLeft: 10,
      marginBottom: 15,
      fontSize: 14,
      boxShadow: 'none',
      borderColor: errorMessage
        ? '#e53935'
        : state.isFocused
        ? '#bf9b30'
        : '#b9b9b9',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#bf9b30', // Custom colour
    }),
  };

  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            id={id}
            placeholder={placeholder}
            styles={customStyles}
            {...field}
            options={options}
          />
        )}
        rules={{ required: true }}
      />
      {errorMessage && (
        <FormMessage nofill type='error' message={errorMessage} />
      )}
    </div>
  );
};

export default SelectInput;
