'use client';

import React, { JSX, useState } from 'react';

import { Image } from '@app-shared/components/media';
import { Icon, IconType } from '@app-shared/icons';
import Button from '@app-shared/ui/button';

import styles from './features.module.scss';

const FEATURE_TABS = [
  {
    id: 'data-management',
    label: 'Data Management',
    title: 'Contact Data Management',
    description: [
      'Omrare facilisis rhoncus ut interdum adipiscr',
      'Senectus varius neque ullamcorper',
      'Senectus varius neque consequat',
    ],
    imageSrc: 'banner:placeholder',
    icon: 'DASHBOARD',
  },
  {
    id: 'tracking',
    label: 'Tracking',
    title: 'Advanced Tracking Features',
    description: [
      'Track customer interactions and history',
      'Real-time analytics and insights',
      'Custom tracking parameters',
    ],
    imageSrc: 'banner:placeholder',
    icon: 'CHART',
  },
  {
    id: 'automation',
    label: 'Automation',
    title: 'Workflow Automation',
    description: [
      'Automate repetitive tasks and workflows',
      'Customize triggers and actions',
      'Create advanced automation rules',
    ],
    imageSrc: 'banner:placeholder',
    icon: 'SETTINGS',
  },
  {
    id: 'integration',
    label: 'Seamless Integration',
    title: 'Connect with Your Tools',
    description: [
      'Integrate with your existing software stack',
      'API access for custom integrations',
      'Data synchronization across platforms',
    ],
    imageSrc: 'banner:placeholder',
    icon: 'EXCHANGE',
  },
];

const FEATURE_CARDS = [
  {
    icon: 'WALLET',
    title: 'Document Management',
    description: 'Keep all your important documents organized and accessible',
  },
  {
    icon: 'CHART',
    title: 'Premium Features',
    description: 'Access advanced tools designed for power users',
  },
  {
    icon: 'DASHBOARD',
    title: 'Advanced Reports',
    description: 'Generate detailed reports with customizable parameters',
  },
];

const FeatureContent = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('data-management');

  const activeFeature =
    FEATURE_TABS.find((tab) => tab.id === activeTab) || FEATURE_TABS[0];

  return (
    <div className={styles.featuresWrapper}>
      <section
        className={styles.featuresContainer}
        aria-label="Features section"
      >
        <div className={styles.heroSection}>
          <h1 className={styles.title}>Advanced features to streamline CRM</h1>
          <p className={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra.
          </p>
        </div>

        <div className={styles.tabsWrapper}>
          <div className={styles.tabsContainer}>
            {FEATURE_TABS.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                onClick={() => setActiveTab(tab.id)}
                startIcon={<Icon icon={tab.icon as IconType} />}
                size="small"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.imageContainer}>
            <Image
              imageKey={activeFeature.imageSrc}
              alt={activeFeature.title}
            />
          </div>

          <div className={styles.featureContent}>
            <h2 className={styles.featureTitle}>{activeFeature.title}</h2>
            <ul className={styles.featureList}>
              {activeFeature.description.map((item, index) => (
                <li key={index} className={styles.featureItem}>
                  <span className={styles.featureIcon}>
                    <Icon icon="CHECKMARK" size="sm" color="#fff" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button variant="primary" size="medium">
              More details
            </Button>
          </div>
        </div>

        <div className={styles.featureCards}>
          {FEATURE_CARDS.map((card, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.cardIcon}>
                <Icon
                  icon={card.icon as IconType}
                  size="lg"
                  color="var(--primary)"
                />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <Button
                variant="secondary"
                size="small"
                endIcon={<Icon icon="CHEVRON_DOWN" size="sm" />}
              >
                Learn more
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeatureContent;
