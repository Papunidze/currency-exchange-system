'use client';

import React from 'react';

import AuthLayout from '../auth-layout';
import Form from '@app-shared/ui/form';
import styles from '../auth.module.scss';
import Image from 'next/image';
import Button from '@app-shared/ui/button';
import socialImages from '@app-image/social';
import { signUpScheme } from '@app-shared/schema';

const Page = () => {
  const handleFormSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <AuthLayout title="Registration">
      <Form
        schema={signUpScheme}
        onSubmit={handleFormSubmit}
        submitButtonLabel="Sign In"
      >
        <div className={styles.form__footer}>
          <div className="separator">
            <span>OR</span>
          </div>
          <div className={styles.social__buttons}>
            <Button
              variant="btn-outlined"
              icon={<Image src={socialImages.apple} alt="apple" />}
            >
              Sign In With Apple
            </Button>
            <Button
              variant="btn-outlined"
              icon={<Image src={socialImages.facebook} alt="facebook" />}
            >
              Sign In With Facebook
            </Button>
            <Button
              variant="btn-outlined"
              icon={<Image src={socialImages.google} alt="google" />}
            >
              Sign In With Google
            </Button>
          </div>
          <p className={styles.signup__text}>
            <span>have an account?</span>
            <a href="#" className="link">
              Sign In
            </a>
          </p>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Page;
