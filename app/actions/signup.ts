"use server";

import { headers } from "next/headers";
import { isRateLimited } from "@/lib/rate-limit";
import {
  HONEYPOT_FIELD,
  normalizeSignup,
  signupFromFormData,
  validateSignup,
  type SignupErrors,
} from "@/lib/signup-validation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type SignupState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: SignupErrors }
  | { status: "error"; message: string };

const GENERIC_ERROR =
  "Something went wrong on our end and your info wasn't saved. Please try again in a minute.";

export async function submitSignup(_prev: SignupState, formData: FormData): Promise<SignupState> {
  // Bots fill in every field, including the hidden one. Pretend it worked.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success" };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "That's a lot of sign-ups from one place. Please wait a few minutes and try again.",
    };
  }

  const raw = signupFromFormData(formData);
  const errors = validateSignup(raw);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors };
  }
  const v = normalizeSignup(raw);

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error(
      "[signup] Missing SUPABASE_URL or SUPABASE_SECRET_KEY. See README → Set up Supabase.",
    );
    return { status: "error", message: GENERIC_ERROR };
  }

  // Same email = same person: update their row instead of adding a duplicate.
  const { error } = await supabase.from("alumni").upsert(
    {
      full_name: v.fullName,
      pledge_class: v.pledgeClass,
      email: v.email,
      city: v.city || null,
      current_role: v.currentRole || null,
      open_to_mentoring: v.openToMentoring,
    },
    { onConflict: "email" },
  );

  if (error) {
    console.error("[signup] Supabase error:", error.message);
    return { status: "error", message: GENERIC_ERROR };
  }

  return { status: "success" };
}
