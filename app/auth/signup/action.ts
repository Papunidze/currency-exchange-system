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

    termsAccepted: field('Terms and Conditions')
      .type('checkbox')
      .size('small')
      .linkText(
        `<small>By signing up, you agree to our <a href="/legal/terms" target="_blank" rel="noopener noreferrer" class="link">Terms of Service</a> and <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" class="link ">Privacy Policy</a></small>`,
      )
      .validators(
        V.boolean()
          .required('You must accept the terms and conditions')
          .test('Must be true', (value) => value === true)
          .build(),
      ),
  })
  .build();
