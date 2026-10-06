import { FORM_ENDPOINT } from "@/content/site";

// Sends a form to FORM_ENDPOINT (set at the top of content/site.ts), e.g. a
// Formspree URL. Used by the parent newsletter form.

export type EndpointResult = { status: "success" } | { status: "error"; message: string };

const NOT_CONNECTED =
  "Sign-ups aren't connected yet. Please try again soon, or email us directly.";
const GENERIC_ERROR =
  "Something went wrong and your info wasn't sent. Please try again in a minute.";

export async function sendToEndpoint(data: Record<string, string>, honeypot: string): Promise<EndpointResult> {
  // Spam trap: bots fill in the hidden field. Pretend it worked and send nothing.
  if (honeypot.trim() !== "") return { status: "success" };

  if (!FORM_ENDPOINT) {
    console.error("[form] FORM_ENDPOINT is empty. Paste your Formspree URL at the top of content/site.ts.");
    return { status: "error", message: NOT_CONNECTED };
  }

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return { status: "success" };
    console.error("[form] Endpoint error:", res.status);
    return { status: "error", message: GENERIC_ERROR };
  } catch (err) {
    console.error("[form] Network error:", err);
    return { status: "error", message: "We couldn't reach the server. Check your connection and try again." };
  }
}
