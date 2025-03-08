import { FIELDS } from '@app-shared/constants';
import { VALIDATORS } from '@app-shared/constants/validators';
import { V } from '@app-shared/constants/validators';
import { createSchema, field } from '@app-shared/services/schema';

export const userSchema = createSchema()
  .object({
    name: field('Full Name')
      .type('text')
      .validators(V.string().required('Required Name').min(2, 'Min 2').build()),
    email: FIELDS.email(),
    password: field('Password')
      .type('password')
      .validators(VALIDATORS.password()),
    age: field('Age')
      .type('number')
      .validators(V.number().required().min(18).max(120).toValidator()),

    phone: field('Phone Number')
      .type('tel')
      .validators(
        V.string()
          .matches(/^\+?[0-9\s-()]{7,}$/, 'Invalid phone format')
          .toValidator(),
      ),
    address: field('Address')
      .type('textarea')
      .placeholder('Enter your full address'),
    role: field('User Role')
      .type('select')
      .options([
        { value: 'user', label: 'Regular User' },
        { value: 'admin', label: 'Administrator' },
        { value: 'manager', label: 'Manager' },
      ])
      .defaultValue('user'),
  })
  .build();
