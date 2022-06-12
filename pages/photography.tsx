import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation/Navigation';
import { gql } from '@apollo/client';
import Head from 'next/head';
import client from '../lib/apollo-client';
import styles from '../styles/pages/Home.module.scss';
import Footer from '../components/Footer/Footer';
import Layout from '../components/Layout/Layout';

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
      <Layout>12</Layout>
    </>
  );
};

export default photography;
