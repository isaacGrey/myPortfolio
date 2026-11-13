import { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight, Download } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import MobileHeader from './components/MobileHeader.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { navigation, profile } from './data/portfolio.js';
import { usePortfolioScroll, useTheme } from './hooks/usePortfolioUI.js';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Experience from './sections/Experience.jsx';
import Projects from './sections/Projects.jsx';
import TikTok from './sections/TikTok.jsx';
import Technology from './sections/Technology.jsx';
import Achievements from './sections/Achievements.jsx';
import Certifications from './sections/Certifications.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = usePortfolioScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeItem = navigation.find((item) => item.id === activeSection) ?? navigation[0];

  useEffect(() => {
    const mobileViewport = window.matchMedia('(max-width: 1023px)');
    const syncMenuState = () => {
      // The drawer is a mobile-only control; it must never lock desktop browsing.
      if (!mobileViewport.matches) {
        document.body.classList.remove('menu-is-open');
        setMenuOpen(false);
        return;
      }
      document.body.classList.toggle('menu-is-open', menuOpen);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    syncMenuState();
    mobileViewport.addEventListener?.('change', syncMenuState);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('menu-is-open');
      mobileViewport.removeEventListener?.('change', syncMenuState);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <div className="site-shell relative min-h-screen isolate">
      <div className="scroll-progress" aria-hidden="true"><span /></div>
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />
      <div className="pointer-spotlight" aria-hidden="true" />

      <Sidebar activeSection={activeSection} />
      <MobileHeader
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="main-content relative min-h-screen">
        <div className="content-wrap mx-auto w-full">
          <div className="topbar hidden sm:flex">
            <div className="breadcrumbs"><span>PORTFOLIO</span><i>/</i><strong>{activeItem.label.toUpperCase()}</strong></div>
            <div className="topbar-right">
              <span className="page-marker">IB — {activeItem.index}</span>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>

          <Hero />
          <About />
          <Experience />
          <Projects />
          <Technology />
          <Achievements />
          <Certifications />
          <TikTok />
          <Contact />

          <footer className="site-footer">
            <div className="footer-signature"><strong>IB.</strong><span>Built with intention. © {new Date().getFullYear()}</span></div>
            <div className="footer-right">
              <a href={profile.resume} download>Résumé <Download size={13} /></a>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
              <a href={`mailto:${profile.email}`}>Email <ArrowUpRight size={13} /></a>
              <a href="#home" className="back-to-top">Back to top <ArrowUp size={14} /></a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
