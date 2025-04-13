import { Metadata } from 'next';
import React, { JSX, Suspense } from 'react';

import { Loading } from '@app-shared/layouts';

import SignUpContent from './sign-up-content';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account for the Currency Exchange System.',
  robots: 'noindex',
};

export default function SignUpPage(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <SignUpContent />
    </Suspense>
  );
}
