'use client';

import Link from 'next/link';
import React, { JSX } from 'react';

import LegalLayout from '../legal-layout';
import styles from '../legal.module.scss';

const PrivacyPolicy = (): JSX.Element => {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle={`Last updated: ${new Date().toLocaleDateString()}`}
    >
      <article className={styles.legalContent}>
        <section aria-labelledby="introduction">
          <h2 id="introduction">1. Introduction</h2>
          <p>
            At Currency Exchange System, we take your privacy seriously. This
            Privacy Policy explains how we collect, use, and protect your
            personal information.
          </p>
        </section>

        <section aria-labelledby="information-collected">
          <h2 id="information-collected">2. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>Personal identification information (name, email, etc.)</li>
            <li>Transaction history</li>
            <li>Device and usage information</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section aria-labelledby="information-usage">
          <h2 id="information-usage">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and maintain our Service</li>
            <li>Process transactions</li>
            <li>Send you important updates</li>
            <li>Improve our Service</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section aria-labelledby="data-security">
          <h2 id="data-security">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the internet is
            100% secure.
          </p>
        </section>

        <section aria-labelledby="user-rights">
          <h2 id="user-rights">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section aria-labelledby="cookies">
          <h2 id="cookies">6. Cookies</h2>
          <p>
            We use cookies to improve your experience. You can control cookies
            through your browser settings.
          </p>
        </section>

        <section aria-labelledby="third-party">
          <h2 id="third-party">7. Third-Party Services</h2>
          <p>
            We may use third-party services that collect, monitor, and analyze
            information to improve our Service.
          </p>
        </section>

        <section aria-labelledby="policy-changes">
          <h2 id="policy-changes">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new policy on this page.
          </p>
        </section>

        <section aria-labelledby="contact">
          <h2 id="contact">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{' '}
            <a href="mailto:privacy@currencyexchange.com">
              privacy@currencyexchange.com
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

export default PrivacyPolicy;
