"use server";

export async function createPost(formData: FormData) {
  const email = formData.get("email");
  console.log("Server Action:", email);
}
