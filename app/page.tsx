import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Home - Fast & Secure Currency Exchange',
  description:
    'Exchange currencies securely with real-time rates and minimal fees. Quick transfers, multiple payment methods, and 24/7 customer support.',
  keywords: ['currency exchange', 'home', 'exchange rates', 'forex'],
};

export default function Home(): JSX.Element {
  return <h1>Welcome to Currency Exchange System</h1>;
}
