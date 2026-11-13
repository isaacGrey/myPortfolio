import { useMemo, useState } from 'react';
import { ArrowUpRight, Boxes, Database, FileCode2, GraduationCap, Presentation, ShoppingBag, Trophy, Users, Video, WalletCards, Workflow } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCover from '../components/ProjectCover.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import TagList from '../components/TagList.jsx';
import { projects, projectFilters } from '../data/portfolio.js';

const projectIcons = {
  graduation: GraduationCap, boxes: Boxes, trophy: Trophy, shopping: ShoppingBag,
  workflow: Workflow, database: Database, presentation: Presentation,
  users: Users, video: Video, wallet: WalletCards,
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const visibleProjects = useMemo(() => activeFilter === 'ALL'
    ? projects
    : projects.filter((project) => project.categories?.includes(activeFilter)), [activeFilter]);

  return (
    <section className="content-section" id="projects" data-section-label="selected work">
      <SectionHeading
        kicker="03 / PROBLEMS & SOLUTIONS"
        title="Selected work."
        description="A closer look at real business problems, the software I helped build, and the integrations that connected the pieces. Private client work is described at a high level."
        number="03—08"
      />
      <div className="project-toolbar" data-reveal>
        <div className="project-filters" role="group" aria-label="Filter projects by category">
          {projectFilters.map((filter) => (
            <button key={filter.value} type="button"
              className={activeFilter === filter.value ? 'project-filter is-active' : 'project-filter'}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}>{filter.label}</button>
          ))}
        </div>
        <span className="project-count">{String(visibleProjects.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} PROJECTS</span>
      </div>
      <div className="project-grid grid grid-cols-2 gap-3">
        {visibleProjects.map((project) => {
          const Icon = projectIcons[project.icon] ?? FileCode2;
          return (
            <article className={`project-card ${project.featured ? 'project-card--featured' : ''}`} key={project.number}>
              <ProjectCover key={project.cover || project.number} project={project} Icon={Icon} />
              <button type="button" className="project-card-open"
                onClick={() => setSelectedProject(project)}
                aria-label={`View full details and screenshots for ${project.title}`} />
              <div className="project-card-top">
                <div className="project-icon-wrap"><Icon size={19} strokeWidth={1.5} /></div>
                <span className="project-number">{project.number}</span>
              </div>
              <div className="project-type">{project.type}</div>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              {project.challenge && (
                <div className="project-problem-solution">
                  <div><span>THE PROBLEM</span><p>{project.challenge}</p></div>
                  <div><span>WHAT I DELIVERED</span><p>{project.delivered}</p></div>
                </div>
              )}
              <TagList items={project.stack} className="project-tags" />
              {project.status && <div className="project-state"><span />{project.status}</div>}
              <div className="project-card-footer">
                <span className="project-card-view">View details <ArrowUpRight size={14} /></span>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer"
                    className={project.action === 'View demo' ? 'project-link project-link--demo' : 'project-link'}>
                    {project.action}<ArrowUpRight size={15} />
                  </a>
                ) : <span className="project-unavailable">{project.note || 'Private project'}</span>}
              </div>
            </article>
          );
        })}
      </div>
      <p className="project-disclaimer" data-reveal>These are project summaries, not claims of specific revenue or performance impact. Public links are included only where available. Some enterprise implementations are proprietary.</p>
      {selectedProject && <ProjectModal key={selectedProject.number} project={selectedProject}
        Icon={projectIcons[selectedProject.icon] ?? FileCode2}
        onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
