'use client';

import React, { JSX, useState } from 'react';

import { Image } from '@app-shared/components/media';
import Button from '@app-shared/ui/button';
import { Checkbox } from '@app-shared/ui/checkbox';

import styles from './subscription.module.scss';

const SubscriptionContent = (): JSX.Element => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className={styles.subscriptionContainer}>
      <div className={styles.subscriptionHeader}>
        <h1>Choose Your Plan</h1>
        <p>
          Select the subscription that best suits your needs and budget. We
          offer a variety of options to meet your requirements.
        </p>

        <div className={styles.switchToggle}>
          <span className={!isAnnual ? styles.active : ''}>Monthly</span>
          <label className="switch">
            <Checkbox
              size="sm"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <span className="slider round"></span>
          </label>
          <span className={isAnnual ? styles.active : ''}>
            Annual <small>Save 20%</small>
          </span>
        </div>
      </div>

      <div className={styles.subscriptionButtons}>
        <div className={styles.subscriptionCard}>
          {isAnnual && <div className={styles.saveBadge}>Save 20%</div>}
          <h1>Free</h1>
          <p>For personal use and small projects</p>
          <h2>
            $0 <span>/month</span>
          </h2>

          <div className={styles.uiContainer}>
            <div className={styles.featureGroup}>
              <h3>Core Features</h3>
              <div className={styles.uiItem}>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>Up to 5 users</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>Basic analytics</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>Community support</p>
                </div>
              </div>
            </div>

            <div className={styles.featureGroup}>
              <h3>Limitations</h3>
              <div className={styles.uiItem}>
                <div className={styles.icon}>
                  <Image imageKey="icon:close" alt="Not included" />
                  <p>No priority support</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:close" alt="Not included" />
                  <p>Limited storage (500MB)</p>
                </div>
              </div>
            </div>

            <div className={styles.cta}>
              <Button>Get Started</Button>
              <small>No credit card required</small>
            </div>
          </div>
        </div>

        <div className={`${styles.subscriptionCard} ${styles.popular}`}>
          <h1>Pro</h1>
          <p>For growing businesses and teams</p>
          <h2>
            {isAnnual ? '$23' : '$29'}{' '}
            <span>/month {isAnnual && 'billed annually'}</span>
          </h2>

          <div className={styles.uiContainer}>
            <div className={styles.featureGroup}>
              <h3>Everything in Free, plus</h3>
              <div className={styles.uiItem}>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>Up to 20 users</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>Advanced analytics</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>Priority email support</p>
                </div>
              </div>
            </div>

            <div className={styles.featureGroup}>
              <h3>Pro Features</h3>
              <div className={styles.uiItem}>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>Custom branding</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>10GB storage</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>API access</p>
                </div>
              </div>
            </div>

            <div className={styles.cta}>
              <Button>Subscribe Now</Button>
              <small>30-day money-back guarantee</small>
            </div>
          </div>
        </div>

        <div className={styles.subscriptionCard}>
          <h1>Enterprise</h1>
          <p>For large organizations and corporations</p>
          <h2>
            {isAnnual ? '$79' : '$99'}{' '}
            <span>/month {isAnnual && 'billed annually'}</span>
          </h2>

          <div className={styles.uiContainer}>
            <div className={styles.featureGroup}>
              <h3>Everything in Pro, plus</h3>
              <div className={styles.uiItem}>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>Unlimited users</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>Advanced security</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>24/7 dedicated support</p>
                </div>
              </div>
            </div>

            <div className={styles.featureGroup}>
              <h3>Enterprise Features</h3>
              <div className={styles.uiItem}>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>SSO integration</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>Unlimited storage</p>
                </div>
                <div className={styles.icon}>
                  <Image imageKey="icon:check" alt="Check" />
                  <p>SLA guarantees</p>
                </div>
              </div>
            </div>

            <div className={styles.cta}>
              <Button>Contact Sales</Button>
              <small>Custom implementation available</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionContent;
