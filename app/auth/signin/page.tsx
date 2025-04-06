'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { JSX, Suspense } from 'react';

import { Image } from '@app-shared/components/media';
import CreateForm from '@app-shared/ui/form';
import IconButton from '@app-shared/ui/iconButton';

import { signInFormData, userSchema } from './action';
import AuthLayout from '../auth-layout';
import styles from '../auth.module.scss';

// Component that uses useSearchParams
const SignInContent = (): JSX.Element => {
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get('registered') === 'true';

  const onSubmit = (data: signInFormData): void => {
    console.warn(data);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle={
        isRegistered
          ? 'Registration successful! Please sign in to continue'
          : 'Sign in to your account to continue'
      }
    >
      {isRegistered && (
        <div className={styles.successMessage}>
          Your account has been created successfully. Please sign in to
          continue.
        </div>
      )}

      <CreateForm<signInFormData>
        schema={userSchema}
        onSubmit={onSubmit}
        buttonVariant="primary"
        size="medium"
        submitLabel="Sign In"
        content={
          <div className={styles.forgotPassword}>
            <Link href="/auth/forgot-password">Forgot Password?</Link>
          </div>
        }
      />

      <div className={styles.divider}>
        <span>or continue with</span>
      </div>

      <div className={styles.socialButtons}>
        <IconButton
          icon={<Image imageKey="social:facebook" alt="Facebook" />}
          variant="ghost"
          aria-label="Sign in with Facebook"
          className={styles.socialButton}
        />
        <IconButton
          icon={<Image imageKey="social:google" alt="Google" />}
          variant="ghost"
          aria-label="Sign in with Google"
          className={styles.socialButton}
        />
        <IconButton
          icon={<Image imageKey="social:apple" alt="Apple" />}
          variant="ghost"
          aria-label="Sign in with Apple"
          className={styles.socialButton}
        />
      </div>

      <div className={styles.accountPrompt}>
        <span>Don&apos;t have an account?</span>
        <Link href="/auth/signup">Sign up</Link>
      </div>
    </AuthLayout>
  );
};

const SignInLoading = (): JSX.Element => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <div>Loading...</div>
    </AuthLayout>
  );
};

export default function SignIn(): JSX.Element {
  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInContent />
    </Suspense>
  );
}
