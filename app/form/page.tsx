'use client';

import React from 'react';

import { userSchema } from '@app-shared/schema';
import CreateForm from '@app-shared/ui/form';

interface FormData {
  email: string;
  password: string;
  userType: string;
  description?: string;
}

const Form = () => {
  const handleSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>
      <CreateForm<FormData>
        schema={userSchema}
        onSubmit={handleSubmit}
        selectVariant="secondary"
        buttonVariant="secondary"
        size="medium"
        defaultValues={{
          userType: 'personal',
        }}
      />
    </div>
  );
};

export default Form;
