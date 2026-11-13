import { Award, Medal } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { achievements } from '../data/portfolio.js';

export default function Achievements() {
  return (
    <section className="content-section" id="achievements" data-section-label="achievements">
      <SectionHeading
        kicker="05 / RECOGNITION"
        title="Achievements."
        description="Competitive achievements across professional skills competitions and hackathons."
        number="05—08"
      />
      <div className="achievement-panel">
        <div className="achievement-panel-top" data-reveal>
          <div><Medal size={17} /><span>COMPETITION RECORD</span></div>
          <span>2018 — 2023</span>
        </div>
        <div className="achievement-list">
          {achievements.map((item, index) => (
            <article className="achievement-row" data-reveal key={`${item.title}-${item.year}-${item.rank}`}>
              <div className="achievement-rank"><span>{item.rank}</span></div>
              <div className="achievement-copy">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <div className="achievement-year">{item.year}</div>
              {index === 0 && <Award className="achievement-feature-icon" size={18} />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
