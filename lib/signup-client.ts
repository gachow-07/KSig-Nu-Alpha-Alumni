import {
  normalizeSignup,
  validateSignup,
  type SignupErrors,
  type SignupField,
  type SignupValues,
} from "./signup-validation";

// Sends a sign-up to Supabase straight from the browser. The publishable key
// is public by design: it can only call the `submit_alumni_signup` database
// function (see supabase/migrations), which validates the data again,
// handles spam and rate limits, and can't read anyone's info back.

export type SubmitResult =
  | { status: "success" }
  | { status: "invalid"; errors: SignupErrors }
  | { status: "error"; message: string };

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const GENERIC_ERROR =
  "Something went wrong on our end and your info wasn't saved. Please try again in a minute.";
const RATE_LIMITED =
  "That's a lot of sign-ups from one place. Please wait a few minutes and try again.";

export async function submitSignup(values: SignupValues, honeypot: string): Promise<SubmitResult> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error(
      "[signup] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. See README → Set up Supabase.",
    );
    return { status: "error", message: GENERIC_ERROR };
  }

  const v = normalizeSignup(values);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_alumni_signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_KEY },
      body: JSON.stringify({
        p_full_name: v.fullName,
        p_pledge_class: v.pledgeClass,
        p_email: v.email,
        p_city: v.city,
        p_current_role: v.currentRole,
        p_open_to_mentoring: v.openToMentoring,
        p_website: honeypot,
      }),
    });

    if (res.ok) return { status: "success" };

    const body: { message?: string } = await res.json().catch(() => ({}));
    if (body.message === "rate_limited") return { status: "error", message: RATE_LIMITED };

    if (body.message?.startsWith("invalid_")) {
      const field = body.message.slice("invalid_".length) as SignupField;
      const message = validateSignup(values)[field] ?? "Please check this field.";
      return { status: "invalid", errors: { [field]: message } };
    }

    console.error("[signup] Supabase error:", res.status, body.message);
    return { status: "error", message: GENERIC_ERROR };
  } catch (err) {
    console.error("[signup] Network error:", err);
    return {
      status: "error",
      message: "We couldn't reach the server. Check your connection and try again.",
    };
  }
}
