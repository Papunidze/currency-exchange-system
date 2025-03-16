import { FIELDS } from '@app-shared/constants';
import { VALIDATORS } from '@app-shared/constants/validators';
import { V } from '@app-shared/constants/validators';
import { createSchema, field } from '@app-shared/services/schema';

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export const userSchema = createSchema()
  .object({
    fullName: field('Full Name')
      .type('text')
      .validators(V.string().required('Full name is required').build()),

    email: field('Email Address')
      .type('text')
      .validators(V.string().required('Email is required').email().build()),

    password: field('Password')
      .type('password')
      .validators(
        V.string().required('Password is required').password().build(),
      ),

    confirmPassword: field('Confirm Password')
      .type('password')
      .validators(
        V.string()
          .required('Please confirm your password')
          .test('Passwords do not match', (value, formData) => {
            const password = formData?.get('password') as string;
            return password === value;
          })
          .build(),
      ),
  })
  .build();
