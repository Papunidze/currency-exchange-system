"use client";

import Form from "ui/form";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});
export default function Page() {
  interface FormData {
    name: string;
    email: string;
  }

  const handleFormSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form
      schema={formSchema}
      initialValues={{ name: "", email: "" }}
      onSubmit={handleFormSubmit}
      submitButtonLabel="Sign In"
    >
      <p>SignUp</p>
    </Form>
  );
}
