import { V } from '@app-shared/constants/validators';
import { createSchema, field } from '@app-shared/services/schema';

export const forgotPasswordSchema = createSchema()
  .object({
    email: field('Email Address')
      .type('email')
      .validators(
        V.string()
          .required('Email is required')
          .email('Please enter a valid email address')
          .build(),
      ),
  })
  .build();
