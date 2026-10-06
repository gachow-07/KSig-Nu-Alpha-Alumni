import { story } from "@/content/site";

export default function OurStory() {
  const lastIndex = story.timeline.length - 1;

  return (
    <section id="story" aria-labelledby="story-heading" className="section-pad bg-surface">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{story.eyebrow}</p>
          <h2 id="story-heading" className="section-heading mt-4">
            {story.heading}
          </h2>
          <div className="mt-6 space-y-5 text-lg text-muted">
            {story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <ol className="relative">
          {story.timeline.map((entry, i) => {
            const isLast = i === lastIndex;
            return (
              <li key={`${entry.year}-${i}`} className="relative flex gap-5 pb-8 last:pb-0">
                {!isLast && (
                  <span aria-hidden="true" className="absolute left-[11px] top-7 h-full w-0.5 bg-line" />
                )}
                <span
                  aria-hidden="true"
                  className={`relative mt-1.5 h-6 w-6 shrink-0 rounded-full border-4 border-white ring-2 ${
                    isLast ? "bg-scarlet ring-scarlet/30" : "bg-emerald ring-gold/60"
                  }`}
                />
                <div className={`card flex-1 p-5 md:p-6 ${isLast ? "border-scarlet/30 bg-scarlet-tint" : ""}`}>
                  <p
                    className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                      isLast ? "bg-scarlet text-white" : "bg-emerald-tint text-emerald"
                    }`}
                  >
                    {entry.year}
                  </p>
                  <h3 className="heading mt-3 text-xl text-ink">{entry.title}</h3>
                  <p className="mt-1 text-muted">{entry.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
