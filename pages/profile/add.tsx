import React from 'react';
import { useForm } from 'react-hook-form';
import client from '../../lib/apollo-client';
import { gql, useMutation } from '@apollo/client';
import Layout from '../../components/Layout/Layout';
import styles from '../../styles/pages/AddService.module.scss';
import TextInput from '../../components/TextInput/TextInput';
import { useSession } from 'next-auth/react';
import SelectInput from '../../components/SelectInput/SelectInput';
import Button from '../../components/Button/Button';
import { Service } from '../../types/types';
import FormMessage from '../../components/FormMessage/FormMessage';
import { useState } from 'react';

const AddService = () => {
  const { data: session, status } = useSession();
  const [successMessage, setSuccessMessage] = useState('');
  const ADD_SERVICE = gql`
    mutation AddService($input: ServiceInput!, $author: String!) {
      createService(input: $input, author: $author) {
        name
      }
    }
  `;
  const [addService, { data, loading, error }] = useMutation(ADD_SERVICE);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Service>({
    defaultValues: {
      name: '',
      city: '',
    },
  });

  const handleAddService = async (data) => {
    const { category, ...inputData } = data;
    inputData.category = data.category.value;

    addService({
      variables: {
        input: inputData,
        author: session.user.email,
      },
      onCompleted: () => {
        setSuccessMessage('Service successfully added!');
      },
    });
  };

  type OptionType = {
    value: string;
    label: string;
  };

  const optionsServices: OptionType[] = [
    { value: 'photography', label: 'Photography' },
    { value: 'hall', label: 'Hall' },
    { value: 'music-band', label: 'Music Band' },
  ];

  return (
    <Layout>
      <div className='container'>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>
            <span>ADD SERVICE</span>
          </h1>
          <p className={styles.infoToClients}>
            This information will be visible on your profile. Complete as many
            of them as possible to increase your chances.
          </p>
          <form onSubmit={handleSubmit(handleAddService)}>
            <TextInput
              register={register}
              id='name'
              name='name'
              label='Service Name'
              placeholder='Type your company name...'
              required
              errorMessage={errors.name ? 'Please fill company name' : null}
            />
            <SelectInput
              options={optionsServices}
              control={control}
              id='category'
              name='category'
              label='Category'
              placeholder='Select category...'
              errorMessage={errors.category ? 'Please fill email field' : null}
            />
            <TextInput
              id='city'
              register={register}
              name='city'
              label='City'
              placeholder='Type city location...'
              required
              errorMessage={errors.city ? 'Please fill city field' : null}
            />
            <TextInput
              id='phone'
              register={register}
              name='phone'
              label='Phone'
              type='number'
              placeholder='Type your phone number...'
              required
              errorMessage={errors.phone ? 'Please fill phone field' : null}
            />
            <TextInput
              id='email'
              register={register}
              name='email'
              label='Email'
              type='email'
              placeholder='Type your contact email...'
              required
              errorMessage={errors.email ? 'Please fill email field' : null}
            />
            <TextInput
              id='photoURL'
              register={register}
              name='photoURL'
              label='Photo'
              placeholder='Type your photo URL...'
              required
              errorMessage={
                errors.photoURL ? 'Please fill photo URL field' : null
              }
            />
            <TextInput
              id='webiste'
              register={register}
              name='website'
              label='Website link'
              placeholder='https://www.example.com'
              required
              errorMessage={
                errors.website ? 'Please fill website URL field' : null
              }
            />
            <TextInput
              id='about'
              register={register}
              name='about'
              label='About company'
              type='textarea'
              rows={8}
              required
              placeholder='Type something about your company...'
              errorMessage={errors.about ? 'Please fill about field' : null}
            />
            <TextInput
              id='price'
              register={register}
              name='price'
              label='Price'
              type='number'
              placeholder='Price of your service... $'
              required
              errorMessage={errors.price ? 'Please fill price field' : null}
            />
            <div className={styles.buttonWrapper}>
              <Button loading={loading} type='submit'>
                ADD
              </Button>
            </div>
          </form>

          {successMessage && isDirty ? (
            <FormMessage message={successMessage} />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default AddService;
