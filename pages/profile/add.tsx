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

const AddService = () => {
  const { data: session, status } = useSession();
  const ADD_SERVICE = gql`
    mutation AddService($input: CompanyInput!, $author: String!) {
      createCompany(input: $input, author: $author) {
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
  } = useForm({
    defaultValues: {},
  });

  const handleAddService = async (data) => {
    const { category, ...inputData } = data;
    inputData.category = data.category.value;

    addService({
      variables: {
        input: inputData,
        author: session.user.email,
      },
    });
  };

  const optionsServices = [
    { value: 'photography', label: 'Photography' },
    { value: 'wedding-hall', label: 'Hall' },
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
              label='Company Name'
              placeholder='Type your company name...'
            />
            <SelectInput
              options={optionsServices}
              control={control}
              id='category'
              name='category'
              label='Category'
              placeholder='Select category...'
            />
            <TextInput
              register={register}
              name='city'
              label='City'
              placeholder='Type city location...'
            />
            <TextInput
              register={register}
              name='phone'
              label='Phone'
              type='number'
              placeholder='Type your phone number...'
            />
            <TextInput
              register={register}
              name='email'
              label='Email'
              type='email'
              placeholder='Type your contact email...'
            />
            <TextInput
              register={register}
              name='photoURL'
              label='Photo'
              placeholder='Type your photo URL...'
            />
            <TextInput
              register={register}
              name='website'
              label='Website link'
              placeholder='https://www.example.com'
            />
            <TextInput
              register={register}
              name='about'
              label='About company'
              type='textarea'
              rows={8}
              placeholder='Type something about your company...'
            />
            <TextInput
              register={register}
              name='price'
              label='Price'
              type='number'
              placeholder='Price of your service... $'
            />
            <Button loading={loading} type='submit'>
              ADD
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddService;
