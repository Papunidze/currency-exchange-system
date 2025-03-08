import { SelectOption } from '@app-shared/ui/select';
import { VALIDATORS } from './validators';
import { field } from '@app-shared/services/schema';

export const FIELDS = {
  name: (label = 'Name') => field(label).validators(VALIDATORS.nameField()),

  email: (label = 'Email Address') =>
    field(label).type('email').validators(VALIDATORS.email()),

  password: (label = 'Password') =>
    field(label).type('password').validators(VALIDATORS.password()),

  phone: (label = 'Phone Number') =>
    field(label).type('tel').validators(VALIDATORS.phone()),

  description: (label = 'Description') =>
    field(label).type('textarea').validators(VALIDATORS.descriptionField()),

  price: (label = 'Price') =>
    field(label).type('number').validators(VALIDATORS.positiveNumber()),

  percentage: (label = 'Percentage') =>
    field(label).type('number').validators(VALIDATORS.percentage()),

  select: (label: string, options: SelectOption[]) =>
    field(label).type('select').options(options),
} as const;
