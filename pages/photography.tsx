import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { gql } from '@apollo/client';
import Head from 'next/head';
import client from '../lib/apollo-client';
import styles from '../styles/pages/Home.module.scss';
import Layout from '../components/Layout/Layout';
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import CategoryList from '../components/CategoryList/CategoryList';
import { Service } from '../types/types';

type Props = {
  services: Service[];
};

const Photography = ({ services }: Props) => {
  return (
    <>
      <Head>
        <title>MYDREAMDAY | Photography - Wedding Portal</title>
        <meta
          name='description'
          content='Wedding portal | Photography - find best services for you'
        />
      </Head>
      <Layout>
        <CategoryHeader
          name={'Photography'}
          backgroundImg={'/images/photography-background.jpg'}
        />
        <CategoryList category={'photography'} data={services} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { city } = query;
  const { data } = await client.query({
    query: gql`
      query Services($category: String!, $city: String) {
        services(category: $category, city: $city) {
          id
          name
          category
          city
          phone
          email
          photoURL
          website
          about
          price
        }
      }
    `,
    variables: {
      category: 'photography',
      city: city,
    },
  });

  return {
    props: {
      services: data.services,
    },
  };
};

export default Photography;
