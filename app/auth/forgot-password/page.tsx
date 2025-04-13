import { Metadata } from 'next';
import React, { JSX, Suspense } from 'react';

import { Loading } from '@app-shared/layouts';

import ForgotPasswordContent from './forgot-password-content';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your Currency Exchange System password.',
};

export default function ForgotPasswordPage(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
