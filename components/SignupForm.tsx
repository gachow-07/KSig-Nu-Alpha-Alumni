"use client";

import { useEffect, useRef, useState } from "react";
import { signup } from "@/content/site";
import { submitSignup, type SubmitResult } from "@/lib/signup-client";
import {
  emptySignup,
  HONEYPOT_FIELD,
  MAX_LENGTHS,
  validateSignup,
  type SignupErrors,
  type SignupField,
  type SignupValues,
} from "@/lib/signup-validation";
import { CheckCircleIcon } from "./Icons";

type FieldConfig = {
  name: SignupField;
  label: string;
  type?: "text" | "email";
  required?: boolean;
  autoComplete: string;
  hint?: string;
  placeholder?: string;
};

const FIELDS: FieldConfig[] = [
  { name: "fullName", label: "Full name", required: true, autoComplete: "name" },
  {
    name: "pledgeClass",
    label: "Pledge class",
    required: true,
    autoComplete: "off",
    placeholder: "e.g. Fall 2012",
  },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "city", label: "City", autoComplete: "address-level2", placeholder: "e.g. San Francisco, CA" },
];

const ROLE_FIELD: FieldConfig = {
  name: "currentRole",
  label: "Current role",
  autoComplete: "organization-title",
  hint: "Job title and company",
  placeholder: "e.g. Project Engineer, Turner Construction",
};

export default function SignupForm() {
  const [state, setState] = useState<SubmitResult | { status: "idle" }>({ status: "idle" });
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState<SignupValues>(emptySignup);
  const [errors, setErrors] = useState<SignupErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the thank-you message so screen readers announce it.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  function update<K extends keyof SignupValues>(name: K, value: SignupValues[K]) {
    const next = { ...values, [name]: value };
    setValues(next);
    // Re-check a field as soon as it's edited, but only if it's already showing an error.
    if (name !== "openToMentoring" && errors[name as SignupField]) {
      const fieldError = validateSignup(next)[name as SignupField];
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  }

  function focusFirstError(errs: SignupErrors) {
    const firstInvalid = FIELDS.concat(ROLE_FIELD).find((f) => errs[f.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid.name}"]`)?.focus();
    }
    return Boolean(firstInvalid);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;

    const clientErrors = validateSignup(values);
    setErrors(clientErrors);
    if (focusFirstError(clientErrors)) return;

    const honeypot = new FormData(e.currentTarget).get(HONEYPOT_FIELD);
    setPending(true);
    const result = await submitSignup(values, typeof honeypot === "string" ? honeypot : "");
    setPending(false);
    setState(result);
    if (result.status === "invalid") {
      setErrors(result.errors);
      focusFirstError(result.errors);
    }
  }

  if (state.status === "success") {
    return (
      <div className="card soft-shadow flex flex-col items-start gap-4 p-8 md:p-10" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-tint text-emerald">
          <CheckCircleIcon className="h-8 w-8" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="section-heading outline-none">
          {signup.successHeading}
        </h3>
        <p className="max-w-xl text-lg text-muted">{signup.successMessage}</p>
      </div>
    );
  }

  const renderField = (f: FieldConfig) => {
    const error = errors[f.name];
    const errorId = `${f.name}-error`;
    const hintId = `${f.name}-hint`;
    const describedBy = [f.hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

    return (
      <div key={f.name} className="flex flex-col">
        <label htmlFor={f.name} className="text-[15px] font-semibold text-ink">
          {f.label}
          {f.required ? (
            <span className="text-scarlet" aria-hidden="true">
              {" "}
              *
            </span>
          ) : (
            <span className="font-normal text-muted"> (optional)</span>
          )}
        </label>
        {f.hint && (
          <span id={hintId} className="text-sm text-muted">
            {f.hint}
          </span>
        )}
        <input
          id={f.name}
          name={f.name}
          type={f.type ?? "text"}
          required={f.required}
          autoComplete={f.autoComplete}
          placeholder={f.placeholder}
          maxLength={MAX_LENGTHS[f.name]}
          value={values[f.name]}
          onChange={(e) => update(f.name, e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={`mt-2 min-h-[50px] rounded-xl border bg-white px-4 py-2 text-ink transition-shadow placeholder:text-muted/70 focus:border-emerald focus:shadow-[0_0_0_4px_rgba(33,87,50,0.12)] ${
            error ? "border-scarlet" : "border-input-line"
          }`}
        />
        {error && (
          <p id={errorId} className="mt-2 text-sm font-semibold text-scarlet">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="card soft-shadow p-6 sm:p-8 md:p-10">
      <p className="mb-6 text-sm text-muted">
        Fields marked <span className="text-scarlet">*</span> are required.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {FIELDS.map(renderField)}
        <div className="md:col-span-2">{renderField(ROLE_FIELD)}</div>
      </div>

      <div className="mt-6">
        <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface-alt px-4 py-3">
          <input
            type="checkbox"
            name="openToMentoring"
            checked={values.openToMentoring}
            onChange={(e) => update("openToMentoring", e.target.checked)}
            className="h-5 w-5 shrink-0 cursor-pointer accent-emerald"
          />
          <span className="font-medium text-ink">I&apos;m open to mentoring current brothers</span>
        </label>
      </div>

      {/* Spam trap: hidden from people, but bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && !pending && (
        <p role="alert" className="mt-6 rounded-xl border border-scarlet/30 bg-scarlet-tint px-4 py-3 font-semibold text-scarlet">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary mt-8 w-full text-lg disabled:opacity-70 sm:w-auto">
        {pending ? "Sending…" : "Add me to the alumni list"}
      </button>
    </form>
  );
}
