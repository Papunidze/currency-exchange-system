'use client';

import React, { useState, useEffect } from 'react';
import styles from './loading.module.scss';

const LOADING_TEXTS = [
  'Connecting to exchange servers...',
  'Fetching latest rates...',
  'Securing connection...',
  'Preparing your dashboard...',
  'Almost there...',
];

const CurrencyExchangeSpinner = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.spinner}
  >
    <path d="M8 3L4 7l4 4" />
    <path d="M4 7h16" />
    <path d="M16 21l4-4-4-4" />
    <path d="M20 17H4" />
  </svg>
);

export default function Loading() {
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingTextIndex(
        (prevIndex) => (prevIndex + 1) % LOADING_TEXTS.length,
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.loadingOverlay}>
      <CurrencyExchangeSpinner />
      <p className={styles.loadingText}>{LOADING_TEXTS[loadingTextIndex]}</p>
    </div>
  );
}
