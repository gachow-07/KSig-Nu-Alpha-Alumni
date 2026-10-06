// Shared by the browser (instant feedback) and the server (the real check).

export type SignupValues = {
  fullName: string;
  pledgeClass: string;
  email: string;
  city: string;
  currentRole: string;
  openToMentoring: boolean;
};

export type SignupField = Exclude<keyof SignupValues, "openToMentoring">;
export type SignupErrors = Partial<Record<SignupField, string>>;

export const emptySignup: SignupValues = {
  fullName: "",
  pledgeClass: "",
  email: "",
  city: "",
  currentRole: "",
  openToMentoring: false,
};

/** Name of the hidden spam-trap field. Real people never see or fill it in. */
export const HONEYPOT_FIELD = "website";

export const MAX_LENGTHS: Record<SignupField, number> = {
  fullName: 120,
  pledgeClass: 40,
  email: 254,
  city: 120,
  currentRole: 200,
};

// Practical email check: something@something.tld, no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trims every text field and lowercases the email. */
export function normalizeSignup(values: SignupValues): SignupValues {
  return {
    fullName: values.fullName.trim().replace(/\s+/g, " "),
    pledgeClass: values.pledgeClass.trim().replace(/\s+/g, " "),
    email: values.email.trim().toLowerCase(),
    city: values.city.trim(),
    currentRole: values.currentRole.trim(),
    openToMentoring: Boolean(values.openToMentoring),
  };
}

export function validateSignup(raw: SignupValues): SignupErrors {
  const v = normalizeSignup(raw);
  const errors: SignupErrors = {};

  if (!v.fullName) errors.fullName = "Please enter your full name.";
  if (!v.pledgeClass) errors.pledgeClass = 'Please enter your pledge class, like "Fall 2012".';

  if (!v.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email)) errors.email = "That email doesn't look right. Check for typos.";

  for (const field of Object.keys(MAX_LENGTHS) as SignupField[]) {
    if (!errors[field] && v[field].length > MAX_LENGTHS[field]) {
      errors[field] = `Please keep this under ${MAX_LENGTHS[field]} characters.`;
    }
  }

  return errors;
}

/** Reads the form fields out of submitted FormData. */
export function signupFromFormData(formData: FormData): SignupValues {
  const text = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value : "";
  };
  return {
    fullName: text("fullName"),
    pledgeClass: text("pledgeClass"),
    email: text("email"),
    city: text("city"),
    currentRole: text("currentRole"),
    openToMentoring: formData.get("openToMentoring") === "on",
  };
}
