import { Bot, Code2, Database, Globe2, Handshake, Layers3, Smartphone } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { technologyGroups } from '../data/portfolio.js';

const icons = { layers: Layers3, code: Code2, database: Database, mobile: Smartphone, globe: Globe2, handshake: Handshake, bot: Bot };

export default function Technology() {
  return (
    <section className="content-section" id="stack" data-section-label="capabilities">
      <SectionHeading kicker="04 / CAPABILITIES & TOOLS" title="Engineering meets delivery."
        description="The technologies and collaboration skills I use for enterprise solutions, client demos, and rapid development. LLMs are development tools in my workflow, not a substitute for review and testing."
        number="04—08" />
      <div className="stack-grid grid grid-cols-3 gap-3">
        {technologyGroups.map((group, index) => {
          const Icon = icons[group.icon] ?? Code2;
          return (
            <article className="stack-card" data-reveal key={group.title}>
              <div className="stack-card-heading"><span className="stack-card-icon"><Icon size={17} strokeWidth={1.6} /></span><span className="stack-card-index">0{index + 1}</span></div>
              <h3>{group.title}</h3><div className="stack-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
