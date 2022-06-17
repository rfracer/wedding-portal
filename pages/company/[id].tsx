import React from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  IoCall,
  IoGlobe,
  IoLocation,
  IoArrowBackCircle,
  IoMail,
} from 'react-icons/io5';
import styles from '../../styles/pages/Company.module.scss';
import Layout from '../../components/Layout/Layout';

const CompanyPage = ({ company }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{company.name}</title>
      </Head>
      <Layout>
        <div className='container'>
          <div className={styles.wrapper}>
            <button
              className={styles.backButton}
              type='button'
              aria-label='previous page button'
              onClick={() => router.back()}
            >
              <IoArrowBackCircle /> Back
            </button>
            <h1 className={styles.companyName}>{company.name}</h1>
            <span className={styles.location}>
              <IoLocation />
              {company.city}
            </span>
            <div className={styles.contactInfo}>
              <span className={styles.contactInfoItem}>
                <IoCall />
                <a href={`tel:${company.phone}`}>{company.phone}</a>
              </span>
              <span className={styles.contactInfoItem}>
                <IoGlobe />
                <a target='_blank' rel='noreferrer' href={company.website}>
                  {company.website}
                </a>
              </span>
              <span className={styles.contactInfoItem}>
                <IoMail />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </span>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                className={styles.image}
                src={company.photoURL}
                alt={company.image}
                layout='fill'
                objectFit='cover'
                objectPosition='center'
              />
            </div>
            <p className={styles.companyDescription}>{company.about}</p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
      query Company($companyId: ID!) {
        company(id: $companyId) {
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
      companyId: params.id,
    },
  });

  return {
    props: {
      company: data.company,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        companies {
          id
        }
      }
    `,
  });

  return {
    paths: data.companies.map((company) => ({ params: { id: company.id } })),
    fallback: false,
  };
}

export default CompanyPage;
