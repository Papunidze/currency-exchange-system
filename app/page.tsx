import { Metadata } from 'next';
import { MainLayout } from '@app-layouts/index';

export const metadata: Metadata = {
  title: 'Home - Fast & Secure Currency Exchange',
  description:
    'Exchange currencies securely with real-time rates and minimal fees. Quick transfers, multiple payment methods, and 24/7 customer support.',
  keywords: ['currency exchange', 'home', 'exchange rates', 'forex'],
};

export default function Home() {
  return (
    <MainLayout userName="John">
      <h1>Welcome to Currency Exchange System</h1>
    </MainLayout>
  );
}
