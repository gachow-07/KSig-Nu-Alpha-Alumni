/**
 * One labelled text input with optional hint and inline error, in the site's
 * form style. Used by the alumni sign-up form and the parent newsletter form.
 */
type Props = {
  name: string;
  label: string;
  type?: "text" | "email";
  required?: boolean;
  autoComplete: string;
  hint?: string;
  placeholder?: string;
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  /** Prefix for the element ids, so two forms on one page never share an id. */
  idPrefix?: string;
};

export default function TextField({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  hint,
  placeholder,
  maxLength,
  value,
  onChange,
  error,
  idPrefix = "",
}: Props) {
  const id = `${idPrefix}${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-bold">
        {label}
        {required ? (
          <span className="text-accent" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {hint && (
        <span id={hintId} className="text-sm text-muted">
          {hint}
        </span>
      )}
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`mt-2 min-h-[48px] rounded-md border bg-white px-4 py-2 text-ink transition-[border-color,box-shadow] duration-300 ease-out placeholder:text-muted/70 focus:border-primary focus:shadow-[0_0_0_4px_rgba(15,77,58,0.12)] ${
          error ? "border-accent" : "border-input-border"
        }`}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm font-semibold text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
