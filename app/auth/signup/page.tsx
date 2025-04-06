'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { JSX } from 'react';

import { Image } from '@app-shared/components/media';
import CreateForm from '@app-shared/ui/form';
import IconButton from '@app-shared/ui/iconButton';

import { SignUpFormData, userSchema } from './action';
import AuthLayout from '../auth-layout';
import styles from '../auth.module.scss';

const SignUp = (): JSX.Element => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: SignUpFormData): Promise<void> => {
    console.warn(data);

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/auth/signin?registered=true');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to get started with our platform"
    >
      <CreateForm<SignUpFormData>
        schema={userSchema}
        onSubmit={onSubmit}
        buttonVariant="primary"
        size="medium"
        submitLabel="Create Account"
        isLoading={isLoading}
      />

      <div className={styles.divider}>
        <span>or sign up with</span>
      </div>

      <div className={styles.socialButtons}>
        <IconButton
          icon={<Image imageKey="social:facebook" alt="Facebook" />}
          variant="ghost"
          aria-label="Sign up with Facebook"
          className={styles.socialButton}
        />
        <IconButton
          icon={<Image imageKey="social:google" alt="Google" />}
          variant="ghost"
          aria-label="Sign up with Google"
          className={styles.socialButton}
        />
        <IconButton
          icon={<Image imageKey="social:apple" alt="Apple" />}
          variant="ghost"
          aria-label="Sign up with Apple"
          className={styles.socialButton}
        />
      </div>

      <div className={styles.accountPrompt}>
        <span>Already have an account?</span>
        <Link href="/auth/signin">Sign in</Link>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
