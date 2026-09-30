import { validateAccountId } from './validate-account-id';

export const isUnknownAccountNotFound = ({
  loading,
  account,
  accountId
}: {
  loading: boolean;
  account: unknown;
  accountId: string;
}) => !loading && !account && !validateAccountId(accountId);
