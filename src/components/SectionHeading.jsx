import { ArrowDownRight } from 'lucide-react';

export default function SectionHeading({ kicker, title, description, number }) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <div className="section-kicker"><span />{kicker}</div>
        <h2 className="section-title">{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      <div className="section-heading-side">
        <span>{number}</span>
        <ArrowDownRight size={19} strokeWidth={1.4} />
      </div>
    </div>
  );
}
