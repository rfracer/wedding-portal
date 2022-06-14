import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';

const CompanyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <Layout>{id}</Layout>;
};

export default CompanyPage;
