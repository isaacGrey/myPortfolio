import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import TagList from './TagList.jsx';
import ProjectCover from './ProjectCover.jsx';

function Screenshot({ screenshot, projectTitle }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="project-modal-shot-unavailable" role="status">Screenshot could not be loaded. Check its file path.</div>;
  }
  return <img src={screenshot.src} alt={screenshot.alt || `${projectTitle} screenshot`}
    onError={() => setFailed(true)} />;
}

export default function ProjectModal({ project, Icon, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const screenshots = (project.screenshots || [])
    .map((item) => typeof item === 'string' ? { src: item } : item)
    .filter((item) => item?.src);
  const hasGallery = screenshots.length > 0;
  const activeImage = screenshots[selectedImage] ?? screenshots[0];

  // Restore keyboard focus and page scrolling when the dialog is closed.
  useEffect(() => {
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = oldOverflow;
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
      if (event.key === 'ArrowRight' && hasGallery) {
        setSelectedImage((value) => (value + 1) % screenshots.length);
      }
      if (event.key === 'ArrowLeft' && hasGallery) {
        setSelectedImage((value) => (value - 1 + screenshots.length) % screenshots.length);
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) { event.preventDefault(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, hasGallery, screenshots.length]);

  const details = project.details || {};
  const extraDetails = [
    ['MY ROLE', details.role],
    ['APPROACH', details.approach],
    ['IMPLEMENTATION DETAILS', details.implementation],
    ['OUTCOME', details.outcome],
  ].filter(([, value]) => Boolean(value));

  return createPortal(
    <div className="project-modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section ref={dialogRef} className="project-modal" role="dialog" aria-modal="true"
        aria-labelledby={`project-modal-title-${project.number}`}
        aria-describedby={`project-modal-description-${project.number}`}>
        <header className="project-modal-header">
          <span className="project-modal-overline">SELECTED WORK <span>/</span> {project.number}</span>
          <button type="button" ref={closeRef} className="project-modal-close"
            onClick={onClose} aria-label="Close project details"><X size={19} /></button>
        </header>
        <div className="project-modal-scroll">
          <ProjectCover key={project.cover || project.number} project={project} Icon={Icon} className="project-modal-cover" />
          <div className="project-modal-inner">
            <span className="project-modal-type">{project.type}</span>
            <h2 id={`project-modal-title-${project.number}`}>{project.title}</h2>
            <p className="project-modal-lead" id={`project-modal-description-${project.number}`}>{project.description}</p>

            <div className="project-modal-details">
              {project.challenge && <div className="project-modal-detail"><h3>THE PROBLEM</h3><p>{project.challenge}</p></div>}
              {project.delivered && <div className="project-modal-detail"><h3>WHAT I DELIVERED</h3><p>{project.delivered}</p></div>}
              {extraDetails.map(([label, body]) => (
                <div className="project-modal-detail" key={label}><h3>{label}</h3><p>{body}</p></div>
              ))}
              {Array.isArray(details.highlights) && details.highlights.length > 0 && (
                <div className="project-modal-detail project-modal-detail--wide"><h3>KEY FEATURES / HIGHLIGHTS</h3>
                  <ul className="project-modal-feature-list">{details.highlights.map((highlight, idx) => <li key={idx}>{highlight}</li>)}</ul>
                </div>
              )}
            </div>

            {hasGallery && <section className="project-modal-gallery" aria-label="Project screenshots">
              <div className="project-modal-gallery-head"><h3>SCREENSHOTS</h3><span>{String(selectedImage + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}</span></div>
              <div className="project-modal-gallery-stage" key={activeImage.src}>
                <Screenshot screenshot={activeImage} projectTitle={project.title} />
                {screenshots.length > 1 && <>
                  <button type="button" className="project-modal-gallery-arrow is-prev" aria-label="Previous screenshot"
                    onClick={() => setSelectedImage((idx) => (idx - 1 + screenshots.length) % screenshots.length)}><ChevronLeft size={22} /></button>
                  <button type="button" className="project-modal-gallery-arrow is-next" aria-label="Next screenshot"
                    onClick={() => setSelectedImage((idx) => (idx + 1) % screenshots.length)}><ChevronRight size={22} /></button>
                </>}
              </div>
              {activeImage.caption && <p className="project-modal-gallery-caption">{activeImage.caption}</p>}
              {screenshots.length > 1 && <div className="project-modal-thumbnails" aria-label="Choose screenshot">
                {screenshots.map((shot, idx) => <button type="button" key={`${shot.src}-${idx}`}
                  className={`project-modal-thumb ${selectedImage === idx ? 'is-active' : ''}`}
                  aria-label={`Show screenshot ${idx + 1}: ${shot.alt || shot.caption || project.title}`}
                  aria-pressed={selectedImage === idx} onClick={() => setSelectedImage(idx)}>
                  <img src={shot.src} alt="" loading="lazy" />
                </button>)}
              </div>}
            </section>}

            <div className="project-modal-bottom">
              <div>
                <h3>TECHNOLOGIES</h3>
                <TagList items={project.stack} className="project-modal-tags" />
                {project.status && <p className="project-modal-status"><span />{project.status}</p>}
              </div>
              {project.href ? <a className="project-modal-external" href={project.href} target="_blank" rel="noreferrer">
                {project.action || 'View project'} <ArrowUpRight size={15} /></a> : (
                <span className="project-modal-private">{project.note || 'Private project'}</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
}
