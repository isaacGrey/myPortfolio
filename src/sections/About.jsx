import { Languages, MapPin, MonitorCog } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { about, approach, profile } from '../data/portfolio.js';

export default function About() {
  return (
    <section className="content-section" id="about" data-section-label="how I work">
      <SectionHeading kicker="01 / HOW I WORK" title={about.heading} description={about.subtitle} number="01—08" />
      <div className="about-layout">
        <div className="about-copy" data-reveal>
          {about.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph.map((segment, partIndex) => segment.strong
                ? <strong key={partIndex}>{segment.text}</strong>
                : <span key={partIndex}>{segment.text}</span>)}
            </p>
          ))}
        </div>
        <aside className="profile-card" data-reveal>
          <div className="profile-card-header"><span>PROFILE / SNAPSHOT</span><span className="profile-card-mark">IB.</span></div>
          <div className="profile-card-name">{profile.name}</div>
          <div className="profile-card-role">{profile.role}</div>
          <div className="profile-facts">
            {about.facts.map(([label, value], index) => (
              <div className="profile-fact" key={label}>
                <span>{label}</span><strong>{value}</strong>
                {index === 3 && <MapPin size={14} />}
                {index === 4 && <Languages size={14} />}
                {index === 2 && <MonitorCog size={14} />}
              </div>
            ))}
          </div>
          <a className="profile-card-email" href={`mailto:${profile.email}`}><span>Let's talk solutions ↗</span></a>
        </aside>
      </div>
      <div className="approach-head" data-reveal><span>HOW I APPROACH A PROBLEM</span><span>DISCOVER → INTEGRATE → DELIVER → ENABLE</span></div>
      <div className="approach-grid">
        {approach.map((step) => (
          <article className="approach-card" data-reveal key={step.step}>
            <span>{step.step}</span><h3>{step.title}</h3><p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
