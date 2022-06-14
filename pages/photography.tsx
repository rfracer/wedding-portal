import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { gql } from '@apollo/client';
import Head from 'next/head';
import client from '../lib/apollo-client';
import styles from '../styles/pages/Home.module.scss';
import Layout from '../components/Layout/Layout';
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import CategoryList from '../components/CategoryList/CategoryList';

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Companies($category: String!) {
        companies(category: $category) {
          name
          category
        }
      }
    `,
    variables: {
      category: 'hope is a good thing',
    },
  });

  return {
    props: {
      companies: data.companies,
    },
    revalidate: 1,
  };
};

const photography = () => {
  return (
    <>
      <Head>
        <title>MYDREAMDAY | Photography - Wedding Portal</title>
        <meta
          name='description'
          content='Wedding portal | Photography - find best companies for you'
        />
      </Head>
      <Layout>
        <CategoryHeader
          name={'Photography'}
          backgroundImg={'/images/photography-background.jpg'}
        />
        <CategoryList />
      </Layout>
    </>
  );
};

export default photography;
