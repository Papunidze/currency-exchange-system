import React, { JSX, Suspense } from 'react';

import { Loading } from '@app-shared/layouts';
import ContactContent from './contact-content';

export default function Contact(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <ContactContent />
    </Suspense>
  );
}
