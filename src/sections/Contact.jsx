import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, Github, Mail } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { profile } from '../data/portfolio.js';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        const input = document.createElement('textarea');
        input.value = profile.email;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        const success = document.execCommand('copy');
        input.remove();
        if (!success) throw new Error('Copy command failed');
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setCopied(false); }
  }

  return (
    <section className="content-section contact-section" id="contact" data-section-label="contact">
      <SectionHeading kicker="08 / LET'S BUILD SOMETHING USEFUL" title="Contact." number="08—08" />
      <div className="contact-panel" data-reveal>
        <div className="contact-panel-orbit" aria-hidden="true" />
        <div className="contact-panel-content">
          <div className="contact-kicker"><span /> OPEN TO FDE &amp; SOLUTIONS ENGINEERING ROLES</div>
          <h3>Bring the problem.<br /><span>I'll bring the engineering.</span></h3>
          <p>I'm exploring Forward Deployed Engineer, Solutions Engineer, and technical implementation opportunities where I can work closely with customers and own the path from requirement to working software.</p>
          <a className="contact-email" href={`mailto:${profile.email}`}><Mail size={17} />{profile.email}<ArrowUpRight size={16} /></a>
          <div className="contact-actions">
            <a className="button button-primary" href={`mailto:${profile.email}?subject=Forward%20Deployed%20Engineering%20Opportunity`}>Start a conversation <ArrowUpRight size={16} /></a>
            <a className="button button-outline" href={profile.resume} download><Download size={15} /> Résumé</a>
            <button className="button button-outline" type="button" onClick={copyEmail}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy email'}</button>
            <a className="button button-outline github-contact" href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="contact-panel-index" aria-hidden="true">IB / 08</div>
      </div>
    </section>
  );
}
