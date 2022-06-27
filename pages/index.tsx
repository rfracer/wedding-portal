import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../components/Navigation/Navigation';
import { gql } from '@apollo/client';
import Head from 'next/head';
import client from '../lib/apollo-client';
import styles from '../styles/pages/Home.module.scss';
import FormHome from '../components/FormHome/FormHome';
import Footer from '../components/Footer/Footer';

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Services($category: String!) {
        services(category: $category) {
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
      services: data.services,
    },
    revalidate: 1,
  };
};

const Home = ({ services }) => {
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
            <Link href='/photography'>
              <a>
                <div className={styles.popularCategoryItem}>
                  <Image
                    src='/images/photography-category.jpg'
                    className={styles.categoryBackground}
                    alt='Wedding photographer'
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                  />
                  <div className={styles.categoryItemTitle}>
                    <h3>Photography</h3>
                  </div>
                </div>
              </a>
            </Link>
            <Link href='/music-band'>
              <a>
                <div className={styles.popularCategoryItem}>
                  <Image
                    src='/images/band-category.jpg'
                    className={styles.categoryBackground}
                    alt='Music band'
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                  />
                  <div className={styles.categoryItemTitle}>
                    <h3>Music band</h3>
                  </div>
                </div>
              </a>
            </Link>
            <Link href='/wedding-hall'>
              <a>
                <div className={styles.popularCategoryItem}>
                  <Image
                    src='/images/hall-category.jpg'
                    className={styles.categoryBackground}
                    alt='Wedding photographer'
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                  />
                  <div className={styles.categoryItemTitle}>
                    <h3>WEDDING HALL</h3>
                  </div>
                </div>
              </a>
            </Link>
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
