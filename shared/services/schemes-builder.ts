import {
  InputType,
  SchemaField,
  SelectOption,
  Validators,
} from '@app-shared/interfaces';

import { ValidationBuilder } from './validator-builder';

export class FieldBuilder {
  private field: SchemaField;

  constructor(label: string) {
    this.field = {
      name: '',
      label,
      type: 'text',
    };
  }

  type(value: InputType): FieldBuilder {
    this.field.type = value;
    return this;
  }

  validators(validator: Validators): FieldBuilder {
    if (validator instanceof ValidationBuilder) {
      this.field.validators = validator.toValidator();
    } else {
      this.field.validators = validator;
    }
    return this;
  }

  placeholder(value: string): FieldBuilder {
    this.field.placeholder = value;
    return this;
  }

  disabled(value: boolean = true): FieldBuilder {
    this.field.disabled = value;
    return this;
  }

  hidden(value: boolean = true): FieldBuilder {
    this.field.hidden = value;
    return this;
  }

  options(options: SelectOption[]): FieldBuilder {
    if (this.field.type === 'select' || this.field.type === 'radio') {
      (this.field as SchemaField & { options: SelectOption[] }).options =
        options;
    }
    return this;
  }

  defaultValue(value: string): FieldBuilder {
    if (this.field.type !== 'file') {
      (this.field as SchemaField & { defaultValue?: string }).defaultValue =
        value;
    }
    return this;
  }

  asEmail(): FieldBuilder {
    this.field.type = 'email';
    return this;
  }

  asPassword(): FieldBuilder {
    this.field.type = 'password';
    return this;
  }

  asTextarea(): FieldBuilder {
    this.field.type = 'textarea';
    return this;
  }

  asSelect(): FieldBuilder {
    this.field.type = 'select';
    return this;
  }

  asCheckbox(): FieldBuilder {
    this.field.type = 'checkbox';
    return this;
  }

  asRadio(): FieldBuilder {
    this.field.type = 'radio';
    return this;
  }

  asNumber(): FieldBuilder {
    this.field.type = 'number';
    return this;
  }

  asDate(): FieldBuilder {
    this.field.type = 'date';
    return this;
  }

  _getField(): SchemaField {
    return { ...this.field };
  }
}

export function field(label: string): FieldBuilder {
  return new FieldBuilder(label);
}

export const label = field;

export class SchemaBuilder {
  private readonly schema: SchemaField[] = [];
  private currentField: SchemaField | null = null;

  object(fields: Record<string, FieldBuilder | SchemaField>): SchemaBuilder {
    Object.entries(fields).forEach(([name, fieldOrBuilder]) => {
      if (fieldOrBuilder instanceof FieldBuilder) {
        const field = fieldOrBuilder._getField();
        field.name = name;
        this.schema.push(field);
      } else {
        const field = fieldOrBuilder as SchemaField;
        if (!field.name) field.name = name;
        this.schema.push(field);
      }
    });
    return this;
  }

  field(name: string, fieldBuilder: FieldBuilder): SchemaBuilder {
    const field = fieldBuilder._getField();
    field.name = name;
    this.schema.push(field);
    return this;
  }

  build(): SchemaField[] {
    if (this.currentField) {
      this.schema.push(this.currentField);
      this.currentField = null;
    }
    return [...this.schema];
  }
}

export function createSchema(): SchemaBuilder {
  return new SchemaBuilder();
}
