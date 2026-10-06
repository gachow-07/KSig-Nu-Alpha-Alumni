"use client";

import { useEffect, useRef, useState } from "react";
import { parents } from "@/content/site";
import { sendToEndpoint, type EndpointResult } from "@/lib/form-endpoint";
import { prefersReducedMotion } from "@/lib/motion";
import TextField from "./forms/TextField";
import { CheckCircleIcon, CheckIcon, SpinnerIcon } from "./Icons";

// Parent newsletter sign-up. Same look and behavior as the alumni form, but it
// posts to FORM_ENDPOINT (Formspree) instead of the alumni database.

type Values = { parentName: string; email: string; studentName: string; classYear: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

/** Formspree's own honeypot name, so Formspree also drops anything that fills it. */
const HONEYPOT = "_gotcha";
const SUCCESS_PAUSE_MS = 600;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX: Record<Field, number> = { parentName: 120, email: 254, studentName: 120, classYear: 20 };

const FIELDS: { name: Field; label: string; type?: "email"; required?: boolean; autoComplete: string; placeholder?: string }[] = [
  { name: "parentName", label: "Parent name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "studentName", label: "Student's name", required: true, autoComplete: "off" },
  { name: "classYear", label: "Student's class year", autoComplete: "off", placeholder: "e.g. 2029" },
];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.parentName.trim()) e.parentName = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look right. Check for typos.";
  if (!v.studentName.trim()) e.studentName = "Please enter your student's name.";
  for (const f of Object.keys(MAX) as Field[]) {
    if (!e[f] && v[f].trim().length > MAX[f]) e[f] = `Please keep this under ${MAX[f]} characters.`;
  }
  return e;
}

export default function ParentForm({ successHeading: SuccessHeading = "h4" }: { successHeading?: "h3" | "h4" }) {
  const [values, setValues] = useState<Values>({ parentName: "", email: "", studentName: "", classYear: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<EndpointResult | { status: "idle" }>({ status: "idle" });
  const [pending, setPending] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  function update(name: Field, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending || succeeded) return;
    const errs = validate(values);
    setErrors(errs);
    const first = FIELDS.find((f) => errs[f.name]);
    if (first) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${first.name}"]`)?.focus();
      return;
    }
    const honeypot = new FormData(e.currentTarget).get(HONEYPOT);
    setPending(true);
    const result = await sendToEndpoint(
      {
        form: "Parent newsletter",
        parentName: values.parentName.trim(),
        email: values.email.trim().toLowerCase(),
        studentName: values.studentName.trim(),
        classYear: values.classYear.trim(),
      },
      typeof honeypot === "string" ? honeypot : "",
    );
    setPending(false);
    if (result.status === "success" && !prefersReducedMotion()) {
      setSucceeded(true);
      await new Promise((resolve) => setTimeout(resolve, SUCCESS_PAUSE_MS));
    }
    setState(result);
  }

  if (state.status === "success") {
    return (
      <div className="card animate-enter flex flex-col items-start gap-4 p-8 md:p-10" role="status">
        <CheckCircleIcon className="h-12 w-12 text-primary" />
        <SuccessHeading ref={successRef} tabIndex={-1} className="display text-3xl font-extrabold text-primary outline-none">
          {parents.newsletter.successHeading}
        </SuccessHeading>
        <p className="max-w-xl text-lg text-muted">{parents.newsletter.successMessage}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="card relative p-7 md:p-10">
      <p className="mb-6 text-sm text-muted">
        Fields marked <span className="text-accent">*</span> are required.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {FIELDS.map((f) => (
          <TextField
            key={f.name}
            idPrefix="parent-"
            name={f.name}
            label={f.label}
            type={f.type}
            required={f.required}
            autoComplete={f.autoComplete}
            placeholder={f.placeholder}
            maxLength={MAX[f.name]}
            value={values[f.name]}
            onChange={(value) => update(f.name, value)}
            error={errors[f.name]}
          />
        ))}
      </div>

      {/* Spam trap: hidden from people, but bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="parent-gotcha">Leave this field empty</label>
        <input id="parent-gotcha" name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && !pending && (
        <p role="alert" className="mt-6 rounded-md border border-accent bg-accent/5 px-4 py-3 font-semibold text-accent">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || succeeded}
        aria-busy={pending || undefined}
        className={`btn btn-primary mt-8 w-full text-lg sm:w-auto ${pending ? "disabled:opacity-70" : ""}`}
      >
        {pending && <SpinnerIcon className="h-5 w-5" />}
        {succeeded && <CheckIcon className="animate-enter h-5 w-5" />}
        {pending ? "Sending…" : "Sign me up"}
      </button>
    </form>
  );
}
