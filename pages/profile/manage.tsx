import { useState } from 'react';
import { useMutation } from '@apollo/client';
import styles from '../../styles/pages/ManageServices.module.scss';
import Image from 'next/image';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import FormMessage from '../../components/FormMessage/FormMessage';
import { Service } from '../../types/types';

type Props = {
  services: Service[];
};

const ManageServices = ({ services }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<null | {
    type: string;
    message: string;
  }>(null);

  const DELETE_SERVICE = gql`
    mutation deleteService($deleteServiceId: ID!) {
      deleteService(id: $deleteServiceId) {
        name
      }
    }
  `;
  const [deleteService, { data, loading, error }] = useMutation(DELETE_SERVICE);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDeleteMessage(null);
  };

  const handleDelete = () => {
    deleteService({
      variables: {
        deleteServiceId: 'af8be78f-406d-4739-952c-2fe4efdee765',
      },
      onCompleted: () => {
        setDeleteMessage({ type: 'success', message: 'Succesfully deleted' });
        setModalIsOpen(false);
      },
      onError: () => {
        setDeleteMessage({
          type: 'error',
          message: 'Something goes wrong! Try again later',
        });
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        handleClose={closeModal}
        modalHeader={'Confirm deletion'}
      >
        <div className={styles.modalContentWrapper}>
          <p>Do you really wanna delete this service?</p>
          <div className={styles.modalButtonsWrapper}>
            <Button onClick={handleDelete} color={'#e53935'}>
              Delete
            </Button>
            <Button onClick={() => closeModal()} color={'#494949'}>
              Cancel
            </Button>
            {deleteMessage && (
              <FormMessage type='error' message={deleteMessage.message} />
            )}
          </div>
        </div>
      </Modal>
      <Layout>
        <div className='container'>
          <div className={styles.wrapper}>
            <h1 className={styles.heading}>
              <span>MANAGE SERVICES</span>
            </h1>
            {data && deleteMessage.type === 'success' && (
              <FormMessage type='success' message={deleteMessage.message} />
            )}
            <ul className={styles.servicesList}>
              {services.map(({ id, name, category, photoURL, about }) => (
                <li key={id} className={styles.serviceItem}>
                  <div className={styles.imageWrapper}>
                    <Image
                      className={styles.image}
                      src={photoURL}
                      alt={name}
                      layout='fill'
                      objectFit='cover'
                      objectPosition='center'
                    />
                  </div>
                  <div className={styles.infoWrapper}>
                    <div className={styles.titleWrapper}>
                      <h2 className={styles.title}>{name}</h2>
                      <h3 className={styles.category}>{category}</h3>
                      <p className={styles.about}>
                        {about.slice(0, 150)}
                        {' ...'}
                      </p>
                    </div>
                    <div className={styles.buttonsWrapper}>
                      <Button outline>EDIT</Button>
                      <Button color={'#e53935'} onClick={openModal}>
                        DELETE
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const { data } = await client.query({
    query: gql`
      query Services($email: String!) {
        user(email: $email) {
          id
          services {
            id
            name
            about
            photoURL
            category
          }
        }
      }
    `,
    variables: {
      email: session.user.email,
    },
  });

  return {
    props: {
      services: data.user.services,
    },
  };
};

export default ManageServices;
