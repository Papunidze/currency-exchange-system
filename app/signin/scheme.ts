import { VALIDATORS } from "@app-shared/consts";
import { SchemaField } from "@app-shared/interfaces";

export const signScheme: SchemaField[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    validators: VALIDATORS.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters")
      .alpha("Username can only contain letters and numbers")
      .build(),
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    validators: VALIDATORS.string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .build(),
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    validators: VALIDATORS.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password too long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .build(),
  },
  {
    name: "passwordConfirm",
    type: "password",
    label: "Confirm Password",
    validators: VALIDATORS.string()
      .required("Password confirmation is required")
      .test("Password Not Match", (value, formData) => {
        const password = formData?.get("password") as string;
        return value === password;
      })
      .build(),
  },
];
