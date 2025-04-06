'use client';

import Link from 'next/link';
import React, { JSX } from 'react';

import LegalLayout from '../legal-layout';
import styles from '../legal.module.scss';

const TermsOfService = (): JSX.Element => {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle={`Last updated: ${new Date().toLocaleDateString()}`}
    >
      <article className={styles.legalContent}>
        <section aria-labelledby="introduction">
          <h2 id="introduction">1. Introduction</h2>
          <p>
            Welcome to Currency Exchange System. By accessing or using our
            services, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section aria-labelledby="definitions">
          <h2 id="definitions">2. Definitions</h2>
          <dl>
            <dt>
              <strong>Service</strong>
            </dt>
            <dd>
              Refers to the Currency Exchange System website and all related
              services.
            </dd>
            <dt>
              <strong>User</strong>
            </dt>
            <dd>Refers to any individual or entity that uses our Service.</dd>
          </dl>
        </section>

        <section aria-labelledby="account-registration">
          <h2 id="account-registration">3. Account Registration</h2>
          <p>
            To use our Service, you must register for an account. You agree to
            provide accurate and complete information during registration.
          </p>
        </section>

        <section aria-labelledby="user-responsibilities">
          <h2 id="user-responsibilities">4. User Responsibilities</h2>
          <p>As a user of our Service, you agree to:</p>
          <ul>
            <li>Provide accurate information</li>
            <li>Maintain the security of your account</li>
            <li>Comply with all applicable laws</li>
            <li>Not engage in fraudulent activities</li>
          </ul>
        </section>

        <section aria-labelledby="service-usage">
          <h2 id="service-usage">5. Service Usage</h2>
          <p>
            Our Service is provided &ldquo;as is&ldquo; and we make no
            warranties regarding its availability or performance.
          </p>
        </section>

        <section aria-labelledby="limitation-liability">
          <h2 id="limitation-liability">6. Limitation of Liability</h2>
          <p>
            We shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of our
            Service.
          </p>
        </section>

        <section aria-labelledby="changes-terms">
          <h2 id="changes-terms">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will
            notify users of any significant changes.
          </p>
        </section>

        <section aria-labelledby="contact-information">
          <h2 id="contact-information">8. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:support@currencyexchange.com">
              support@currencyexchange.com
            </a>
            .
          </p>
        </section>

        <nav aria-label="Back to sign up">
          <Link href="/auth/signup">Back to Sign Up</Link>
        </nav>
      </article>
    </LegalLayout>
  );
};

export default TermsOfService;
