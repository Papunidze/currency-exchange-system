'use client';

import Form from '@app-shared/ui/form';
import { newSchema } from './scheme';

export default function Page() {
  const handleFormSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <Form
      schema={newSchema}
      onSubmit={handleFormSubmit}
      submitButtonLabel="Sign In"
      btnStyle="btn-secondary"
      submitButtonProps={{ className: 'custom-class' }}
    >
      <p>SignUp</p>
    </Form>
  );
}
