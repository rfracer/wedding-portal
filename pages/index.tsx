import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../public/images/logo-white.svg';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { gql } from '@apollo/client';
import Head from 'next/head';
import client from '../lib/apollo-client';
import styles from '../styles/pages/Home.module.scss';
import FormHome from '../components/FormHome/FormHome';
import Footer from '../components/Footer/Footer';

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

const Home = ({ companies }) => {
  return (
    <>
      <Head>
        <title>MYDREAMDAY - Wedding Portal</title>
        <meta
          name='description'
          content='Wedding portal - find best companies for you'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
        <Navigation home />
        <div className='container'>
          <FormHome />
        </div>
      </header>
      <section className={styles.popularCategoriesWrapper}>
        <div className='container'>
          <h2 className={styles.subheading}>POPULAR CATEGORIES</h2>
          <div className={styles.popularCategoriesItemsWrapper}>
            <div className={styles.popularCategoryItem}>
              <Link href='/'>
                <a>
                  <div>
                    <h3>Photography</h3>
                  </div>
                </a>
              </Link>
            </div>
            <div className={styles.popularCategoryItem}>
              <Link href='/'>
                <a>
                  <div>
                    <h3>MUSIC BANDS</h3>
                  </div>
                </a>
              </Link>
            </div>
            <div className={styles.popularCategoryItem}>
              <Link href='/'>
                <a>
                  <div>
                    <h3>Hall</h3>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <section className={styles.sectionBlog}>
        <div className='container'>
          <h2 className={styles.subheading}>PRAKTYCZNE PORADY</h2>
        </div>
      </section> */}

      <Footer />
    </>
  );
};

export default Home;
