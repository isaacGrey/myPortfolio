import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import TagList from '../components/TagList.jsx';
import { experience } from '../data/portfolio.js';

export default function Experience() {
  return (
    <section className="content-section" id="experience" data-section-label="experience">
      <SectionHeading
        kicker="02 / PROFESSIONAL HISTORY"
        title="Experience."
        description="Enterprise implementation, API integrations, client-facing demonstrations, and hands-on software development."
        number="02—08"
      />
      <div className="experience-list">
        {experience.map((item, index) => (
          <article className="experience-item" data-reveal key={`${item.company}-${item.date}`}>
            <div className="experience-rail">
              <span className={`experience-dot ${index === 0 ? 'is-current' : ''}`} />
              {index !== experience.length - 1 && <span className="experience-line" />}
            </div>
            <div className="experience-content">
              <div className="experience-topline">
                <div>
                  <div className="experience-company"><BriefcaseBusiness size={13} />{item.company}</div>
                  <h3>{item.role}</h3>
                </div>
                <span className="experience-date">{item.date}</span>
              </div>
              <p>{item.description}</p>
              {item.highlights && (
                <ul className="experience-highlights">
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              )}
              <TagList items={item.tags} />
            </div>
            <span className="experience-number">0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
