import { SCHEMA_BUILDER, VALIDATORS } from '@app-shared/constants';

export const signInSchema = SCHEMA_BUILDER.Object({
  email: SCHEMA_BUILDER.name('email')
    .type('text')
    .label('Email Address')
    .validation(VALIDATORS.string().email().required().build())
    .add(),
  password: SCHEMA_BUILDER.name('password')
    .type('password')
    .label('Password')
    .validation(VALIDATORS.string().min(6).required().build())
    .add(),
});
