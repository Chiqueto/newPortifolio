import { getPublicProjectBySlug } from "@/features/public/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) notFound();

  const stack: string[] = project.tech_stack
    ? Array.isArray(project.tech_stack)
      ? project.tech_stack
      : String(project.tech_stack).split(",").map((s: string) => s.trim())
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-gold transition-colors"
          >
            <FaArrowLeft size={12} /> Voltar
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Case Study
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Header block */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-12">
          {/* Main info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.status && (
                <span className="font-mono text-xs uppercase tracking-wider text-gold border border-gold/30 rounded px-2 py-0.5 bg-gold/5">
                  {project.status.replace("_", " ")}
                </span>
              )}
              {project.project_type && (
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5">
                  {project.project_type}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {project.title}
            </h1>

            {project.short_description && (
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                {project.short_description}
              </p>
            )}
          </div>

          {/* Metadata column */}
          <div className="mt-8 md:mt-0 shrink-0 w-full md:w-52 space-y-5">
            {stack.length > 0 && (
              <div className="space-y-1.5">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((t: string) => (
                    <Badge key={t} variant="outline" className="font-mono text-xs rounded">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              {project.live_url && (
                <Link href={project.live_url} target="_blank"
                  className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-gold transition-colors">
                  <FaArrowUpRightFromSquare size={12} /> Demo ao vivo
                </Link>
              )}
              {project.repository_url && (
                <Link href={project.repository_url} target="_blank"
                  className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-gold transition-colors">
                  <FaGithub size={14} /> Código
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {project.cover_image_url && (
          <div className="relative aspect-video w-full rounded border border-border overflow-hidden bg-surface">
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        {project.content ? (
          <article
            className="prose prose-sm md:prose-base prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
              prose-code:font-mono prose-code:text-xs prose-code:bg-surface prose-code:rounded prose-code:px-1.5 prose-code:py-0.5"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        ) : (
          <p className="text-muted-foreground text-sm italic">Descrição detalhada em breve.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 max-w-4xl mx-auto">
        <Link href="/#projects" className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-gold transition-colors">
          <FaArrowLeft size={12} /> Ver todos os projetos
        </Link>
      </footer>
    </div>
  );
}
