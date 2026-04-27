"use server";

import { supabase } from "@/lib/supabase/client";

export async function submitContactMessage(prevState: any, formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!fullName || !email || !message) {
      return { success: false, message: "Please fill out all required fields." };
    }

    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          full_name: fullName,
          email: email,
          phone_num: phone,
          message: message,
        }
      ]);

    if (error) {
      console.error("Supabase Error:", error.message);
      return { success: false, message: "Something went wrong. Please try again later." };
    }

    return { success: true, message: "Message sent successfully! I'll get back to you soon." };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
