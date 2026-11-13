import { useState } from 'react';

// Cover image is optional. Missing/incorrect paths fall back to the site's own artwork.
export default function ProjectCover({ project, Icon, className = '' }) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(project.cover) && !failed;

  return (
    <div className={`project-cover ${hasImage ? 'project-cover--image' : ''} ${className}`}>
      {hasImage ? (
        <img src={project.cover} alt={`${project.title} project cover`} loading="lazy"
          style={project.coverPosition ? { objectPosition: project.coverPosition } : undefined}
          onError={() => setFailed(true)} />
      ) : (
        <div className="project-cover-placeholder" aria-hidden="true">
          <span className="project-cover-grid" />
          <span className="project-cover-halo" />
          <span className="project-cover-symbol"><Icon size={34} strokeWidth={1.2} /></span>
          <span className="project-cover-index">IB / {project.number}</span>
        </div>
      )}
    </div>
  );
}
