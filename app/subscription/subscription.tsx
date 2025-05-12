import React, { JSX, Suspense } from 'react';

import { Loading } from '@app-shared/layouts';

import SubscriptionContent from './subscription-content';

export default function Subscription(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <SubscriptionContent />
    </Suspense>
  );
}
