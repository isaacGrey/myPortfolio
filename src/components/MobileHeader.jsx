import { Menu, X } from 'lucide-react';
import { navigation, profile } from '../data/portfolio.js';

export default function MobileHeader({ activeSection, menuOpen, setMenuOpen }) {
  const activeLabel = navigation.find((item) => item.id === activeSection)?.label ?? 'Overview';

  return (
    <>
      <header className="mobile-header lg:hidden">
        <a href="#home" className="mobile-brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">IB<span>.</span></span>
          <span className="mobile-brand-copy">
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
          </span>
        </a>
        <div className="mobile-header-actions">
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu lg:hidden ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-heading">
          <span>PORTFOLIO INDEX</span>
          <span>{activeLabel}</span>
        </div>
        <nav id="mobile-navigation" className="mobile-menu-nav" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              tabIndex={menuOpen ? 0 : -1}
              className={activeSection === item.id ? 'is-active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.index}</span>
              <strong>{item.label}</strong>
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <span className="availability-dot" />
          <span>Open to relevant opportunities</span>
        </div>
      </div>
      {menuOpen && <button className="mobile-menu-backdrop lg:hidden" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
