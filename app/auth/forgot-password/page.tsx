'use client';

import React, { JSX } from 'react';
import Link from 'next/link';

import CreateForm from '@app-shared/ui/form';

import { forgotPasswordSchema } from './action';
import AuthLayout from '../auth-layout';
import styles from '../auth.module.scss';

const ForgotPassword = (): JSX.Element => {
  const onSubmit = (data: { email: string }): void => {
    console.warn(data);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
      <CreateForm<{ email: string }>
        schema={forgotPasswordSchema}
        onSubmit={onSubmit}
        buttonVariant="primary"
        size="medium"
        submitLabel="Send Reset Link"
      />

      <div className={styles.accountPrompt}>
        <span>Remember your password?</span>
        <Link href="/auth/signin">Sign in</Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
