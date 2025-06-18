'use client';

import React from 'react';

import api from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

export interface TransactionsStatsProps {}

export const TransactionsStats: React.FC<TransactionsStatsProps> = () => {
  const { loading, data, error } = api.transactions.useGetStats({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Transactions (24H)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p> {success ? `1,234,456` : 'Loading...'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Transactions Fee (24H)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>{success ? `1,234.56 QUAN` : 'Loading...'}</CardContent>
      </Card>
    </div>
  );
};
