export interface signInFormData {
  email: string;
  password: string;
}

import { V } from '@app-shared/constants/validators';
import { createSchema, field } from '@app-shared/services/schema';

export const userSchema = createSchema()
  .object({
    email: field('Enter Email')
      .type('text')
      .validators(V.string().required('Email is required').email().build()),
    password: field('Password')
      .type('password')
      .validators(
        V.string().required('Password is required').password().build(),
      ),
  })
  .build();
