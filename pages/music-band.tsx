import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { gql } from '@apollo/client';
import Head from 'next/head';
import client from '../lib/apollo-client';
import styles from '../styles/pages/Home.module.scss';
import Layout from '../components/Layout/Layout';
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import CategoryList from '../components/CategoryList/CategoryList';

const MusicBand = ({ companies }) => {
  return (
    <>
      <Head>
        <title>MYDREAMDAY | Music Bands - Wedding Portal</title>
        <meta
          name='description'
          content='Wedding portal | Music Bands - find the best music band for you'
        />
      </Head>
      <Layout>
        <CategoryHeader
          name={'Music Bands'}
          backgroundImg={'/images/band-category.jpg'}
        />
        <CategoryList category='music-band' data={companies} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { city } = query;
  const { data } = await client.query({
    query: gql`
      query Companies($category: String!, $city: String) {
        companies(category: $category, city: $city) {
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
      companies: data.companies,
    },
  };
};

export default MusicBand;