import { InputType, SchemaField, ValidatorFn } from '@app-shared/interfaces';

export class SchemaBuilder {
  private readonly schema: SchemaField[] = [];

  Object(fields: Record<string, SchemaField>) {
    Object.values(fields).forEach((field) => this.schema.push(field));
    return this.schema;
  }

  name(value: string) {
    return new FieldBuilder(value);
  }
}

class FieldBuilder {
  private readonly field: SchemaField;

  constructor(name: string) {
    this.field = { name, label: 'label', type: 'text' };
  }

  label(value: string) {
    this.field.label = value;
    return this;
  }

  type(value: InputType) {
    this.field.type = value;
    return this;
  }

  validation(validator: ValidatorFn<string>) {
    this.field.validators = validator;
    return this;
  }

  add() {
    return this.field;
  }
}
