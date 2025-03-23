'use client';

import React, { JSX } from 'react';

import { Image } from '@app-shared/components/media';
import CreateForm from '@app-shared/ui/form';
import IconButton from '@app-shared/ui/iconButton';

import { signInFormData, userSchema } from './action';
import AuthLayout from '../auth-layout';
import styles from '../auth.module.scss';

const SignIn = (): JSX.Element => {
  const onSubmit = (data: signInFormData): void => {
    console.warn(data);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <CreateForm<signInFormData>
        schema={userSchema}
        onSubmit={onSubmit}
        buttonVariant="primary"
        size="medium"
        submitLabel="Sign In"
        content={
          <div className={styles.forgotPassword}>
            <a href="/auth/forgot-password">Forgot Password?</a>
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
        <span>Don&apos;st have an account?</span>
        <a href="/auth/signup">Sign up</a>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
