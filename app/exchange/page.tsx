'use client';

import React from 'react';
import { AutoForm } from '@app-shared/ui/form/form';
import { currencyExchangeSchema } from '@app-shared/schema/currency-exchange.schema';

interface ExchangeFormData {
  amount: number;
  fromCurrency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  toCurrency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  note?: string;
}

export default function ExchangePage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (data: ExchangeFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (data.fromCurrency === data.toCurrency) {
        throw new Error('Source and destination currencies must be different');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred during exchange',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Currency Exchange</h1>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <AutoForm<ExchangeFormData>
        schema={currencyExchangeSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          fromCurrency: 'USD',
          toCurrency: 'EUR',
        }}
        isLoading={isSubmitting}
      />
    </div>
  );
}
