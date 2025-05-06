import React, { JSX, Suspense } from 'react';

import { Loading } from '@app-shared/layouts';

import HistoryContent from './history-content';

export default function History(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <HistoryContent />
    </Suspense>
  );
}
