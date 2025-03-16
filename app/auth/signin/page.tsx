'use client';

import React from 'react';
import CreateForm from '@app-shared/ui/form';
import { signInFormData, userSchema } from './action';
import Image from '@app-components/Image';
import IconButton from '@app-shared/ui/iconButton';
import AuthLayout from '../auth-layout';
import styles from '../auth.module.scss';

const SignIn: React.FC = () => {
  const onSubmit = (data: signInFormData) => {
    console.log(data);
    // TODO: Handle authentication
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
        <span>Don't have an account?</span>
        <a href="/auth/signup">Sign up</a>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
