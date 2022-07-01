import React from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';
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
import styles from '../../styles/pages/Service.module.scss';
import Layout from '../../components/Layout/Layout';
import { Service } from '../../types/types';

type Props = {
  service: Service;
};

const ServicePage = ({ service }: Props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{service.name}</title>
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
            <h1 className={styles.serviceName}>{service.name}</h1>
            <span className={styles.location}>
              <IoLocation />
              {service.city}
            </span>
            <div className={styles.contactInfo}>
              <span className={styles.contactInfoItem}>
                <IoCall />
                <a href={`tel:${service.phone}`}>{service.phone}</a>
              </span>
              <span className={styles.contactInfoItem}>
                <IoGlobe />
                <a target='_blank' rel='noreferrer' href={service.website}>
                  {service.website}
                </a>
              </span>
              <span className={styles.contactInfoItem}>
                <IoMail />
                <a href={`mailto:${service.email}`}>{service.email}</a>
              </span>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                className={styles.image}
                src={service.photoURL}
                alt={service.name}
                layout='fill'
                objectFit='cover'
                objectPosition='center'
              />
            </div>
            <p className={styles.serviceDescription}>{service.about}</p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
      query Service($serviceId: ID!) {
        service(id: $serviceId) {
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
      serviceId: params.id,
    },
  });

  return {
    props: {
      service: data.service,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        services {
          id
        }
      }
    `,
  });

  return {
    paths: data.services.map((service) => ({ params: { id: service.id } })),
    fallback: false,
  };
};

export default ServicePage;
