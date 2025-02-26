import { VALIDATORS } from '@app-shared/constants';
import { SchemaBuilder } from '@app-shared/services';

const SIGN_UP_SCHEME = new SchemaBuilder();
const SIGN_IN_SCHEME = new SchemaBuilder();

export const signInSchema = SIGN_UP_SCHEME.Object({
  email: SIGN_UP_SCHEME.name('email')
    .type('text')
    .label('Email')
    .validation(
      VALIDATORS.string()
        .email('Please enter a valid email address')
        .required('Email is required')
        .build(),
    )
    .add(),
  password: SIGN_UP_SCHEME.name('password')
    .type('password')
    .label('Password')
    .validation(
      VALIDATORS.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
        .build(),
    )
    .add(),
});

export const signUpScheme = SIGN_IN_SCHEME.Object({
  name: SIGN_IN_SCHEME.name('username')
    .type('text')
    .label('Full Name')
    .validation(
      VALIDATORS.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Full name is required')
        .build(),
    )
    .add(),
  email: SIGN_IN_SCHEME.name('email')
    .type('text')
    .label('Email')
    .validation(
      VALIDATORS.string()
        .email('Please enter a valid email address')
        .required('Email is required')
        .build(),
    )
    .add(),
  number: SIGN_IN_SCHEME.name('number')
    .type('tel')
    .label('Phone Number')
    .validation(
      VALIDATORS.number()
        .phone('Please enter a valid phone number')
        .required('Phone number is required')
        .build(),
    )
    .add(),
  password: SIGN_IN_SCHEME.name('password')
    .type('password')
    .label('Create Password')
    .validation(
      VALIDATORS.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
        .password()
        .build(),
    )
    .add(),
  passwordConfirm: SIGN_IN_SCHEME.name('password_confirm')
    .type('password')
    .label('Confirm Password')
    .validation(
      VALIDATORS.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Please confirm your password')
        .test('Password Not Match', (value, formData) => {
          if (!formData) return false;
          const password = formData.get('password');
          return value && password ? value === password : false;
        })
        .build(),
    )
    .add(),
});
