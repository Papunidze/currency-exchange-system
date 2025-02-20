'use client';

import { signInSchema } from '@app-shared/schema';
import Button from '@app-shared/ui/button';
import Form from '@app-shared/ui/form';
import styles from './signin.module.scss';

export default function Page() {
  const handleFormSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <div className={styles.form__wrapper}>
      <div className={styles.form__container}>
        <h1 className={styles.form__title}>Sign in</h1>
        <Form
          schema={signInSchema}
          onSubmit={handleFormSubmit}
          submitButtonLabel="Sign In"
        >
          <div className={styles.form__footer}>
            <p className={styles.forgot__password}>
              <a href="#" className="link">
                Forgot Password?
              </a>
            </p>
            <div className="separator">
              <span>OR</span>
            </div>
            <div className={styles.social__buttons}>
              <Button variant="btn-outlined">Sign In With Apple</Button>
              <Button variant="btn-outlined">Sign In With Facebook</Button>
              <Button variant="btn-outlined">Sign In With Google</Button>
            </div>
            <p className={styles.signup__text}>
              <span>Don’t have an account?</span>
              <a href="#" className="link">
                Sign Up
              </a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
