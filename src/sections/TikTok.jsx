import { ArrowUpRight, Play, Video } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { profile } from '../data/portfolio.js';

export default function TikTok() {
  return (
    <section className="content-section tiktok-section" id="tiktok" data-section-label="latest on TikTok">
      <SectionHeading
        kicker="07 / BEYOND THE CODE"
        title="Beyond the code."
        description="I share software experiments and ideas through short videos. A little personality beyond enterprise systems."
        number="07—08"
      />
      <div className="tiktok-card" data-reveal>
        <div className="tiktok-card-main">
          <div className="tiktok-icon"><Video size={23} /></div>
          <div>
            <span className="tiktok-eyebrow">CREATOR PROFILE</span>
            <h3>@iceboxxxb</h3>
            <p>Visit my TikTok profile to watch the latest videos.</p>
          </div>
        </div>
        <div className="tiktok-actions">
          <a href={profile.tiktok} target="_blank" rel="noreferrer" className="button button-primary">
            <Play size={14} fill="currentColor" /> Watch latest videos <ArrowUpRight size={15} />
          </a>
          <a href={profile.tiktok} target="_blank" rel="noreferrer" className="tiktok-follow-link">
            Follow on TikTok <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="tiktok-card-corner" aria-hidden="true">T.</div>
      </div>
    </section>
  );
}
