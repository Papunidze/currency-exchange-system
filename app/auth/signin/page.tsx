import { Metadata } from 'next';
import React, { JSX, Suspense } from 'react';

import { Loading } from '@app-shared/layouts';

import SignInContent from './sign-in-content';

export default function SignIn(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <SignInContent />
    </Suspense>
  );
}

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Currency Exchange System account.',
  robots: 'noindex',
};
