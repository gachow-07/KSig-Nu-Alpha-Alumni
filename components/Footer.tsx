import { footer, nav, site } from "@/content/site";
import { KSBadge } from "./KSMark";
import { InstagramIcon, LinkedInIcon, MailIcon } from "./Icons";

export default function Footer() {
  const linkClass =
    "inline-flex min-h-[44px] items-center gap-3 text-white/85 underline-offset-4 hover:text-white hover:underline";

  return (
    <footer className="on-dark bg-emerald-dark text-white">
      <div aria-hidden="true" className="flex h-1.5">
        <span className="flex-1 bg-scarlet" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-emerald" />
        <span className="flex-1 bg-gold" />
      </div>
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <KSBadge className="h-11 w-11 ring-offset-emerald-dark" />
            <div>
              <p className="heading text-lg">{site.shortName}</p>
              <p className="text-sm text-white/70">{footer.chapterName}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-white/70">{site.school}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/60">Explore</p>
          <ul className="mt-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/60">Stay in touch</p>
          <ul className="mt-3">
            <li>
              <a href={`mailto:${footer.email}`} className={linkClass}>
                <MailIcon /> {footer.email}
              </a>
            </li>
            <li>
              <a href={footer.instagramUrl} className={linkClass} target="_blank" rel="noopener noreferrer">
                <InstagramIcon /> Instagram {footer.instagramHandle}
              </a>
            </li>
            <li>
              <a href={footer.linkedinUrl} className={linkClass} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon /> LinkedIn alumni group
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-site py-6 text-sm text-white/60">
          © {new Date().getFullYear()} {site.name}. Not an official publication of Kappa Sigma
          Fraternity or Cal Poly.
        </p>
      </div>
    </footer>
  );
}
