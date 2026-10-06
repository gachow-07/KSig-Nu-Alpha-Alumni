import { footer, site } from "@/content/site";
import KSMark from "./KSMark";
import Reveal from "./motion/Reveal";
import { InstagramIcon, LinkedInIcon, MailIcon } from "./Icons";

export default function Footer() {
  const linkClass =
    "inline-flex min-h-[44px] items-center gap-3 text-white/90 underline-offset-4 hover:text-white hover:underline";

  return (
    <footer className="on-dark bg-footer text-white">
      <Reveal direction="fade" className="container-site flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div>
          <KSMark className="h-10 w-auto text-white" />
          <p className="mt-5 text-lg font-bold">{footer.chapterName}</p>
          <p className="text-on-dark-muted">{site.school}</p>
        </div>

        <ul className="flex flex-col gap-1">
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
      </Reveal>
      <div className="border-t border-white/10">
        <p className="container-site py-6 text-sm text-on-dark-muted">
          © {new Date().getFullYear()} {site.name}. Not an official publication of Kappa Sigma
          Fraternity or Cal Poly.
        </p>
      </div>
    </footer>
  );
}
