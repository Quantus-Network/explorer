import type { Account } from './account';

export interface Transaction {
  id: string;
  timestamp: string; // ISO-8601 date string
  fee: string;
  extrinsicHash: string;
  blockNumber: number;
  amount: string;
  from: Account;
  to: Account;
}

export interface TransactionListResponse {
  transactions: Transaction[];
}
