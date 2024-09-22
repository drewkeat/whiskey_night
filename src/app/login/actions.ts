"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error)
    return (error.message)
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const meta = {
    firstName: formData.get("first-name") as string,
    lastName: formData.get("last-name") as string,
  };
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  meta.firstName = meta.firstName.charAt(0).toUpperCase() + meta.firstName.slice(1).toLowerCase()
  meta.lastName = meta.lastName.charAt(0).toUpperCase() + meta.lastName.slice(1).toLowerCase()

  const { data: { user }, error } = await supabase.auth.signUp({
    ...data,
    options: {
      data: meta,
      emailRedirectTo: "https://whiskeynight.keatdev.com/",
    },
  });

  if (error) {
    //TODO: INSERT ERROR HANDLING HERE
    console.log("Sign Up Error: ", error);
    return(error.message)
  }

  if (user) {
    return (user.email)
  }

  revalidatePath("/", "layout");
  redirect("/");
}
