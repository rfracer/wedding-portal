import type { GetServerSideProps } from 'next';
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

const WeddingHall = ({ services }: Props) => {
  return (
    <>
      <Head>
        <title>MYDREAMDAY | Wedding Hall/Venue - Wedding Portal</title>
        <meta
          name='description'
          content='Wedding portal | Wedding Hall - find best place for you'
        />
      </Head>
      <Layout>
        <CategoryHeader
          name={'Wedding Hall'}
          backgroundImg={'/images/hall-category.jpg'}
        />
        <CategoryList category='wedding-hall' data={services} />
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
      category: 'hall',
      city: city,
    },
  });

  return {
    props: {
      services: data.services,
    },
  };
};

export default WeddingHall;
