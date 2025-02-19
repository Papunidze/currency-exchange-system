import { VALIDATORS } from '@app-shared/constants';
import { SCHEMA_BUILDER } from '@app-shared/constants/schema';

export const newSchema = SCHEMA_BUILDER.Object({
  name: SCHEMA_BUILDER.name('name')
    .type('text')
    .validation(VALIDATORS.string().min(3).build())
    .add(),
  email: SCHEMA_BUILDER.name('email')
    .type('email')
    .validation(VALIDATORS.string().email().build())
    .add(),
});
