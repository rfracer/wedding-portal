import Select from 'react-select';
import styles from './SelectInput.module.scss';
import { Controller } from 'react-hook-form';

const SelectInput = ({ id, label, name, options, control, placeholder }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: 5,
      padding: 0,
      paddingLeft: 10,
      marginBottom: 15,
      fontSize: 14,
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
    </div>
  );
};

export default SelectInput;
