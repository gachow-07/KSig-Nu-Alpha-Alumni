import { signup } from "@/content/site";
import SignupForm from "./SignupForm";

export default function SignupSection() {
  return (
    <section id="signup" aria-labelledby="signup-heading" className="section-pad bg-surface">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <p className="eyebrow">{signup.eyebrow}</p>
          <h2 id="signup-heading" className="section-heading mt-4">
            {signup.heading}
          </h2>
          <p className="mt-6 text-lg text-muted">{signup.intro}</p>
        </div>
        <SignupForm />
      </div>
    </section>
  );
}
