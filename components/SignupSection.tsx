import { signup } from "@/content/site";
import SignupForm from "./SignupForm";

type Props = {
  /** True when this section is shown on its own page: its title becomes the page's main heading (h1). */
  standalone?: boolean;
  /**
   * NEW: render inside another section (the Alumni section) instead of as its
   * own full-width section. headingLevel sets its title's level there.
   */
  embedded?: { headingLevel: "h2" | "h3" };
};

export default function SignupSection({ standalone = false, embedded }: Props) {
  const Heading = embedded ? embedded.headingLevel : standalone ? "h1" : "h2";
  const successHeading = Heading === "h1" ? "h2" : Heading === "h2" ? "h3" : "h4";

  const body = (
    <>
      <div>
        <p className="eyebrow">{signup.eyebrow}</p>
        <Heading id="signup-heading" className="section-heading mt-4">
          {signup.heading}
        </Heading>
        <p className="mt-6 text-lg text-muted">{signup.intro}</p>
      </div>
      <SignupForm successHeading={successHeading} />
    </>
  );

  if (embedded) {
    return (
      <div id="signup" className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        {body}
      </div>
    );
  }

  return (
    <section id="signup" aria-labelledby="signup-heading" className="section-pad bg-surface">
      <div className="container-site relative z-10 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">{body}</div>
    </section>
  );
}
