'use client';

import api from '@/api';

export const DisplayAccounts = () => {
  const { loading, error, data } = api.accounts.useGetAll();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data?.accounts.map(({ id }) => (
    <div key={id}>
      <p>Account Id: {id}</p>
    </div>
  ));
};
