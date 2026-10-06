import { signup } from "@/content/site";
import SignupForm from "./SignupForm";
import { CheckIcon } from "./Icons";

export default function SignupSection() {
  return (
    <section id="signup" aria-labelledby="signup-heading" className="section-pad bg-emerald-tint">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <div className="lg:pt-4">
          <p className="eyebrow">{signup.eyebrow}</p>
          <h2 id="signup-heading" className="section-heading mt-4">
            {signup.heading}
          </h2>
          <p className="mt-5 text-lg text-muted">{signup.intro}</p>
          <ul className="mt-8 space-y-4">
            {signup.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald text-white">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-ink">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <SignupForm />
      </div>
    </section>
  );
}
