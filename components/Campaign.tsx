import { campaign } from "@/content/site";
import CampaignCard from "./CampaignCard";

type Props = {
  /** True when this section is shown on its own page: its title becomes the page's main heading (h1). */
  standalone?: boolean;
};

export default function Campaign({ standalone = false }: Props) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="give" aria-labelledby="give-heading" className="on-dark section-pad bg-primary text-white">
      <div className="container-site relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow text-on-dark-muted!">{campaign.eyebrow}</p>
          <Heading id="give-heading" className="section-heading mt-4">
            {campaign.name}
          </Heading>
          <p className="mt-6 max-w-xl text-lg text-white/90">{campaign.description}</p>
        </div>

        <CampaignCard
          raised={campaign.raised}
          goal={campaign.goal}
          donors={campaign.donors}
          endDate={campaign.endDate}
          donateUrl={campaign.donateUrl}
          donateLabel={campaign.donateLabel}
        />
      </div>
    </section>
  );
}
