import { ArrowUpRight, BadgeCheck, FileText } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { certifications } from '../data/portfolio.js';

const icons = { badge: BadgeCheck, file: FileText };

export default function Certifications() {
  return (
    <section className="content-section" id="certifications" data-section-label="certifications">
      <SectionHeading
        kicker="06 / PROFESSIONAL CREDENTIALS"
        title="Certifications."
        description="Certificates and assessment credentials. Open a certificate to view its details."
        number="06—08"
      />
      <div className="certification-grid grid grid-cols-2 gap-3">
        {certifications.map((certificate) => {
          const Icon = icons[certificate.icon];
          return (
            <article className="certification-card" data-reveal key={certificate.issuer}>
              <div className="certification-card-top">
                <span className="certification-icon"><Icon size={21} strokeWidth={1.5} /></span>
                <span className="certification-label">CERTIFICATE</span>
              </div>
              <div className="certification-issuer">{certificate.issuer}</div>
              <h3>{certificate.title}</h3>
              <p>{certificate.description}</p>
              <div className="certification-links">
                {certificate.links.map((link) => (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.href} className={link.primary ? 'certification-link is-primary' : 'certification-link'}>
                    {link.label}<ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
