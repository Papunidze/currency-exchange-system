import React, { JSX, Suspense } from 'react';

import { Loading } from '@app-shared/layouts';

import HomeContent from './home-content';

export default function Home(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  );
}
