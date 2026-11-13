import { Download, Github } from 'lucide-react';
import { navigation, profile } from '../data/portfolio.js';

export default function Sidebar({ activeSection }) {
  return (
    <aside className="sidebar-shell hidden lg:flex flex-col" aria-label="Main navigation">
      <a href="#home" className="brand-lockup" aria-label={`${profile.name} home`}>
        <span className="brand-mark">IB<span>.</span></span>
        <span className="brand-copy">
          <strong>Isaac Greyole S. Balingit</strong>
          <small>Enterprise Integrations · FDE Focus</small>
        </span>
      </a>

      <div className="sidebar-rule" />
      <div className="sidebar-overline">PORTFOLIO INDEX</div>

      <nav className="sidebar-nav">
        {navigation.map((item) => {
          const active = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`sidebar-link ${active ? 'is-active' : ''}`}
              aria-current={active ? 'location' : undefined}
            >
              <span className="sidebar-link-index">{item.index}</span>
              <span>{item.label}</span>
              <span className="sidebar-link-indicator" />
            </a>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="availability-chip">
          <span className="availability-dot" />
          <span>Open to relevant opportunities</span>
        </div>
        <a className="sidebar-resume" href={profile.resume} download><Download size={14} /> Download résumé</a>
        <div className="sidebar-social-row">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <Github size={15} />
          </a>
          <span>Designed &amp; developed by Isaac Greyole S. Balingit</span>
        </div>
        <div className="sidebar-copyright">© {new Date().getFullYear()} · All rights reserved</div>
      </div>
    </aside>
  );
}
