import { ArrowDown, ArrowUpRight, Code2, Download, Globe2, MoveUpRight } from 'lucide-react';
import { profile } from '../data/portfolio.js';
import LivingPortrait from '../components/LivingPortrait.jsx';

export default function Hero() {
  return (
    <section className="hero-section" id="home" data-section-label="overview">
      <div className="hero-topline" data-reveal>
        <div className="eyebrow"><span className="eyebrow-line" />CLIENT-FACING SOFTWARE ENGINEER <span className="eyebrow-divider">/</span> {profile.location.toUpperCase()}</div>
        <span className="hero-edition">FDE-FOCUSED PORTFOLIO <span>—</span> 2026</span>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-role-pill" data-reveal><MoveUpRight size={13} /> PURSUING FORWARD DEPLOYED ENGINEERING</div>
          <h1 className="hero-title" data-reveal>
            Isaac Greyole<br />S. <span>Balingit</span>
          </h1>
          <h2 className="hero-statement" data-reveal>From business problem <em>to working software.</em></h2>
          <p className="hero-description" data-reveal>
            I build <strong>enterprise integrations and tailored applications</strong>, collaborate with clients and implementation teams, and demo solutions that make complex workflows easier to run. Software engineer by experience; <strong>Forward Deployed Engineer by direction.</strong>
          </p>
          <div className="hero-actions" data-reveal>
            <a className="button button-primary" href="#projects">Explore selected work <ArrowUpRight size={16} /></a>
            <a className="button button-quiet" href={profile.resume} download><Download size={15} /> Download résumé</a>
          </div>
          <div className="hero-meta" data-reveal>
            <span><Code2 size={14} /> Enterprise APIs &amp; Integrations</span>
            <i />
            <span><Globe2 size={14} /> Client-facing Delivery</span>
          </div>
        </div>
        <LivingPortrait />
      </div>

      <div className="focus-ribbon" data-reveal>
        <span className="focus-ribbon-label">WHERE I ADD VALUE</span>
        <div className="focus-ribbon-items">
          <span>DISCOVERY</span><b>✳</b><span>INTEGRATIONS</span><b>✳</b><span>BUILD &amp; DEPLOY</span><b>✳</b><span>CLIENT DEMOS</span>
        </div>
        <span className="focus-ribbon-index">00 / 08</span>
      </div>
    </section>
  );
}
