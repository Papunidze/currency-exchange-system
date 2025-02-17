"use server";
import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(1, "Email is required."),
});
export async function createPost(formData: FormData) {
  const email = formData.get("email");
  console.log("Server Action:", email);
}
