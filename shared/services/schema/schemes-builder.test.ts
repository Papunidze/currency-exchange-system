import {
  FieldBuilder,
  SchemaBuilder,
  createSchema,
  field,
  label,
} from './schemes-builder';
import { ValidationBuilder } from '@app-services/validator';
import { InputType } from '@app-shared/ui/input';
import { SelectOption } from '@app-shared/ui/select';

describe('FieldBuilder', () => {
  let builder: FieldBuilder;
  const testLabel = 'Test Field';

  beforeEach(() => {
    builder = new FieldBuilder(testLabel);
  });

  it('should create a field with basic properties', () => {
    const field = builder._getField();
    expect(field).toEqual({
      name: '',
      label: testLabel,
      type: 'text',
    });
  });

  it('should set custom type', () => {
    const type: InputType = 'email';
    const field = builder.type(type)._getField();
    expect(field.type).toBe(type);
  });

  it('should set validators', () => {
    const validator = new ValidationBuilder<string>('test')
      .required()
      .toValidator();
    const field = builder.validators(validator)._getField();
    expect(field.validators).toBeDefined();
  });

  it('should set placeholder', () => {
    const placeholder = 'Enter value';
    const field = builder.placeholder(placeholder)._getField();
    expect(field.placeholder).toBe(placeholder);
  });

  it('should set disabled state', () => {
    const field = builder.disabled()._getField();
    expect(field.disabled).toBe(true);
  });

  it('should set hidden state', () => {
    const field = builder.hidden()._getField();
    expect(field.hidden).toBe(true);
  });

  it('should set options for select type', () => {
    const options: SelectOption[] = [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
    ];
    const field = builder.asSelect().options(options)._getField();
    expect(field.type).toBe('select');
    expect((field as any).options).toEqual(options);
  });

  it('should set default value for non-file types', () => {
    const defaultValue = 'test';
    const field = builder.defaultValue(defaultValue)._getField();
    expect((field as any).defaultValue).toBe(defaultValue);
  });

  describe('field type shortcuts', () => {
    it('should set email type', () => {
      expect(builder.asEmail()._getField().type).toBe('email');
    });

    it('should set password type', () => {
      expect(builder.asPassword()._getField().type).toBe('password');
    });

    it('should set textarea type', () => {
      expect(builder.asTextarea()._getField().type).toBe('textarea');
    });

    it('should set select type', () => {
      expect(builder.asSelect()._getField().type).toBe('select');
    });

    it('should set checkbox type', () => {
      expect(builder.asCheckbox()._getField().type).toBe('checkbox');
    });

    it('should set radio type', () => {
      expect(builder.asRadio()._getField().type).toBe('radio');
    });

    it('should set number type', () => {
      expect(builder.asNumber()._getField().type).toBe('number');
    });

    it('should set date type', () => {
      expect(builder.asDate()._getField().type).toBe('date');
    });
  });
});

describe('SchemaBuilder', () => {
  let builder: SchemaBuilder;

  beforeEach(() => {
    builder = createSchema();
  });

  it('should create an empty schema', () => {
    expect(builder.build()).toEqual([]);
  });

  it('should add fields using object method', () => {
    const schema = builder
      .object({
        email: field('Email').asEmail(),
        password: field('Password').asPassword(),
      })
      .build();

    expect(schema).toHaveLength(2);
    expect(schema[0]).toMatchObject({
      name: 'email',
      label: 'Email',
      type: 'email',
    });
    expect(schema[1]).toMatchObject({
      name: 'password',
      label: 'Password',
      type: 'password',
    });
  });

  it('should add field using field method', () => {
    const schema = builder.field('email', field('Email').asEmail()).build();

    expect(schema).toHaveLength(1);
    expect(schema[0]).toMatchObject({
      name: 'email',
      label: 'Email',
      type: 'email',
    });
  });

  it('should handle complex schema with multiple fields and types', () => {
    const schema = builder
      .object({
        name: field('Name')
          .type('text')
          .placeholder('Enter your name')
          .validators(
            new ValidationBuilder<string>('name').required().toValidator(),
          ),
        email: field('Email')
          .asEmail()
          .validators(
            new ValidationBuilder<string>('email')
              .required()
              .email()
              .toValidator(),
          ),
        age: field('Age')
          .asNumber()
          .validators(
            new ValidationBuilder<string>('age')
              .required()
              .min(18)
              .toValidator(),
          ),
        gender: field('Gender')
          .asSelect()
          .options([
            { value: 'm', label: 'Male' },
            { value: 'f', label: 'Female' },
            { value: 'o', label: 'Other' },
          ]),
      })
      .build();

    expect(schema).toHaveLength(4);
    expect(schema.map((field) => field.name)).toEqual([
      'name',
      'email',
      'age',
      'gender',
    ]);
    expect(schema.map((field) => field.type)).toEqual([
      'text',
      'email',
      'number',
      'select',
    ]);
  });
});

describe('field and label functions', () => {
  it('should create a new FieldBuilder instance', () => {
    const testLabel = 'Test Field';
    const fieldBuilder = field(testLabel);
    expect(fieldBuilder).toBeInstanceOf(FieldBuilder);
    expect(fieldBuilder._getField().label).toBe(testLabel);
  });

  it('should have label as an alias for field', () => {
    expect(label).toBe(field);
  });
});
