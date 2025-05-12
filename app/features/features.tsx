import React, { JSX, Suspense } from 'react';

import { Loading } from '@app-shared/layouts';

import FeaturesContent from './features-content';

export default function Features(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <FeaturesContent />
    </Suspense>
  );
}
