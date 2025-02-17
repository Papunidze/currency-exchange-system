export interface FormItem {
  name: string;
  type: string;
  label: string;
  invalid?: string;
  placeholder: string;
  icon?: string;
  validators?: Record<string, string | boolean | RegExp>;
}

export const signScheme: FormItem[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
    invalid: "Please enter a valid name",
    validators: {
      required: true,
      minlenght: /^\w{3, }/,
      maxlenght: /^\w{1, 30}/,
    },
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your Password",
    invalid: "Please enter a valid Password",
    validators: {
      required: true,
      minlenght: /^\w{3, }/,
      maxlenght: /^\w{1, 30}/,
    },
  },
];
