import { getPublicProjectBySlug } from "@/features/public/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

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

  const statusLabel = project.status
    ? project.status.replace(/_/g, " ").toUpperCase()
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar — mantém identidade do workspace */}
      <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
        <div className="px-6 py-3 flex items-center gap-4 max-w-5xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-gold transition-colors"
          >
            <FaArrowLeft size={11} /> Portfólio
          </Link>
          <div className="h-3.5 w-px bg-border" />
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Case Study
          </span>
          <div className="h-3.5 w-px bg-border" />
          <span className="font-mono text-[10px] text-gold uppercase tracking-widest">
            {project.title}
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 space-y-10">

        {/* Header: metadata + título */}
        <div className="rounded border border-border bg-card overflow-hidden">
          {/* Barra de status */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-surface">
            {statusLabel && (
              <span className="font-mono text-xs text-gold uppercase tracking-wider">
                {statusLabel}
              </span>
            )}
            {project.project_type && (
              <>
                <div className="h-3 w-px bg-border" />
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                  {project.project_type}
                </span>
              </>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
            {/* Título + descrição */}
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight leading-tight">
                {project.title}
              </h1>
              {project.short_description && (
                <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                  {project.short_description}
                </p>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.live_url && (
                  <Link
                    href={project.live_url}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 rounded border border-gold/50 text-gold text-xs font-mono hover:bg-gold-muted transition-colors"
                  >
                    <FaArrowUpRightFromSquare size={11} /> Demo ao vivo
                  </Link>
                )}
                {project.repository_url && (
                  <Link
                    href={project.repository_url}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 rounded border border-border text-muted-foreground text-xs font-mono hover:text-foreground hover:border-gold/30 transition-colors"
                  >
                    <FaGithub size={13} /> Código-fonte
                  </Link>
                )}
              </div>
            </div>

            {/* Stack */}
            {stack.length > 0 && (
              <div className="md:w-48 shrink-0 space-y-2">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((t: string) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2 py-0.5 rounded border border-border text-muted-foreground bg-surface"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Imagem de capa */}
        {project.cover_image_url && (
          <div className="relative aspect-video w-full rounded border border-border overflow-hidden bg-surface">
            <Image
              src={project.cover_image_url}
              alt={project.title || ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Conteúdo */}
        {project.content ? (
          <div className="rounded border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-surface">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Descrição
              </p>
            </div>
            <article
              className="p-6 md:p-8 prose prose-sm md:prose-base prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                prose-code:font-mono prose-code:text-xs prose-code:bg-surface prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
                prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        ) : (
          <div className="rounded border border-border bg-card px-6 py-8 text-center">
            <p className="text-muted-foreground text-sm italic">Descrição detalhada em breve.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-gold transition-colors"
          >
            <FaArrowLeft size={10} /> Voltar ao portfólio
          </Link>
          <p className="font-mono text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} · Luís Felipe Chiqueto
          </p>
        </div>
      </footer>
    </div>
  );
}
