import Link from 'next/link';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { PROJECTS, PROJECTS_NDA_NOTE, type Project } from '@/lib/content';

/** Placeholder thị giác cho tile dự án — SVG gradient tự tạo, không cần asset ngoài. */
function ProjectArtwork({ project, index }: { project: Project; index: number }) {
  const gradId = `proj-grad-${index}`;
  return (
    <svg
      viewBox="0 0 600 450"
      role="img"
      aria-label={`Hình minh họa dự án ${project.name}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={project.from} />
          <stop offset="100%" stopColor={project.to} />
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill={`url(#${gradId})`} />
      {/* Omega watermark mờ */}
      <g opacity="0.14" transform="translate(300 215) scale(2.6)" color="#F0EAD9">
        <g transform="translate(-50 -50)">
          <circle cx="50" cy="44" r="34" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="50" cy="44" r="20" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="44" r="5" fill="currentColor" />
        </g>
      </g>
      {/* Chữ cái đầu tên dự án */}
      <text
        x="300"
        y="250"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="150"
        fontWeight="600"
        fill="#F0EAD9"
        opacity="0.9"
      >
        {project.name.charAt(0)}
      </text>
    </svg>
  );
}

/**
 * Section 7 — Dự án nổi bật. Nền navy.
 * Grid tile mock, hover zoom, tag ngành, note NDA.
 */
export function Projects() {
  return (
    <Section tone="navy" id="projects" ariaLabelledby="projects-heading">
      <div className="container-aim">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-gold-bright">Dự án nổi bật</p>
            <h2
              id="projects-heading"
              className="mt-4 font-display text-3xl font-semibold leading-tight text-beige sm:text-4xl lg:text-5xl"
            >
              Một vài thương hiệu đã làm cùng Aim
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-beige/55">{PROJECTS_NDA_NOTE}</p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} as="li" delay={(i % 3) * 0.08}>
              <Link
                href="/projects"
                className="group block overflow-hidden rounded-xl border border-beige/10 bg-navy-deep focus-visible:outline-gold"
                aria-label={`Xem dự án ${project.name} — ngành ${project.industry}`}
              >
                {/* Artwork với hover zoom */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
                    <ProjectArtwork project={project} index={i} />
                  </div>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent"
                  />
                </div>
                {/* Meta */}
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <h3 className="font-display text-lg font-semibold text-beige">{project.name}</h3>
                  <span className="eyebrow shrink-0 rounded-full border border-gold/40 px-3 py-1 text-[0.6rem] text-gold-bright">
                    {project.industry}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
