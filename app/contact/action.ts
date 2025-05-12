import { V } from '@app-shared/constants';
import { createSchema, field } from '@app-shared/services/schema';

export const contactSchema = createSchema()
  .object({
    fullName: field('Full Name')
      .type('text')
      .validators(V.string().required('Full name is required').build()),
    email: field('Email')
      .type('text')
      .validators(V.string().required('Email is required').email().build()),
    queryType: field('Type of Query')
      .type('select')
      .options([
        { value: 'general', label: 'General Inquiry' },
        { value: 'pricing', label: 'Pricing Information' },
        { value: 'demo', label: 'Request a Demo' },
        { value: 'feature', label: 'Feature Request' },
        { value: 'other', label: 'Other' },
      ])
      .validators(V.string().required('Please select a query type').build()),
    message: field('Message').type('textarea').validators(V.string().build()),
  })
  .build();
