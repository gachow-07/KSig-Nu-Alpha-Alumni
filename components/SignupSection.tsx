import { signup } from "@/content/site";
import SignupForm from "./SignupForm";

type Props = {
  /** True when this section is shown on its own page: its title becomes the page's main heading (h1). */
  standalone?: boolean;
};

export default function SignupSection({ standalone = false }: Props) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="signup" aria-labelledby="signup-heading" className="section-pad bg-surface">
      <div className="container-site relative z-10 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <p className="eyebrow">{signup.eyebrow}</p>
          <Heading id="signup-heading" className="section-heading mt-4">
            {signup.heading}
          </Heading>
          <p className="mt-6 text-lg text-muted">{signup.intro}</p>
        </div>
        <SignupForm successHeading={standalone ? "h2" : "h3"} />
      </div>
    </section>
  );
}
