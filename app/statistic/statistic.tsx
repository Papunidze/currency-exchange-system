import React, { JSX, Suspense } from 'react';

import { Loading } from '@app-shared/layouts';
import StatisticContent from './statistic-content';

export default function Statistic(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <StatisticContent />
    </Suspense>
  );
}
