import { getPublicProjectBySlug } from "@/features/public/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Sparkles, FolderGit2 } from "lucide-react";

const DEFAULT_SLUG_IMAGES: Record<string, string> = {
  "plann-er": "/plann.er.png",
  "doutor-agenda": "/doutor_agenda.png",
  "fsw-barber": "/fsw.png",
  "virtuafab": "/virtuafab.png",
  "gameverser": "/capa_gameverser.png",
  "pokedex": "/capa_pokedex.png",
  "pokedex-mobile": "/capa_pokedex_mobile.png",
  "chat-websocket": "/chat_websocket.png",
  "to-do-list": "/todolist.png",
};

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

  const displayImage =
    project.cover_image_url ||
    project.thumbnail_url ||
    DEFAULT_SLUG_IMAGES[project.slug];

  return (
    <div className="min-h-screen bg-[#FBF4EB] dark:bg-[#150314] text-[#22051F] dark:text-[#F9E6C1] transition-colors duration-500 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-[#F59879]/30 bg-[#22051F]/90 backdrop-blur-md text-[#F9E6C1]">
        <div className="px-6 py-3.5 flex items-center justify-between max-w-5xl mx-auto w-full">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-[#F9E6C1] hover:text-[#FFF] hover:scale-105 transition-all"
          >
            <ArrowLeft size={14} className="text-[#F59879]" />
            <span>Voltar ao Portfólio</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#F59879]/70 uppercase tracking-widest hidden sm:inline">
              Estudo de Caso
            </span>
            <span className="text-[#F59879] hidden sm:inline">/</span>
            <span className="text-[#FFF] font-semibold uppercase tracking-wider">
              {project.title}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 space-y-8">
        {/* Header Hero Card */}
        <div className="rounded-[28px] sm:rounded-[36px] border border-[#F59879]/30 bg-gradient-to-br from-[#280624] to-[#1C031A] text-[#F9E6C1] overflow-hidden shadow-[0_20px_50px_rgba(20,2,19,0.3)]">
          {/* Status bar */}
          <div className="flex items-center gap-3 px-6 py-3.5 border-b border-[#F59879]/20 bg-[#22051F]/80">
            {statusLabel && (
              <span className="font-mono text-xs text-[#F59879] uppercase tracking-wider font-semibold">
                {statusLabel}
              </span>
            )}
            {project.project_type && (
              <>
                <div className="h-3 w-px bg-[#F59879]/30" />
                <span className="font-mono text-[11px] text-[#F9E6C1]/70 uppercase tracking-wider">
                  {project.project_type}
                </span>
              </>
            )}
          </div>

          <div className="p-6 sm:p-10 flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex-1 space-y-4">
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
                {project.title}
              </h1>
              {project.short_description && (
                <p className="text-sm sm:text-base text-[#F9E6C1]/90 leading-relaxed max-w-xl">
                  {project.short_description}
                </p>
              )}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {project.live_url && (
                  <Link
                    href={project.live_url}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F59879] hover:bg-[#F9E6C1] text-[#22051F] font-semibold text-xs font-mono transition-all hover:scale-105 active:scale-95 shadow-md"
                  >
                    <ExternalLink size={13} /> Demo ao vivo
                  </Link>
                )}
                {project.repository_url && (
                  <Link
                    href={project.repository_url}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#22051F] hover:bg-[#4A1739] text-[#F9E6C1] hover:text-white border border-[#F59879]/40 text-xs font-mono transition-colors"
                  >
                    <Github size={14} className="text-[#F59879]" /> Código-fonte
                  </Link>
                )}
              </div>
            </div>

            {/* Stack Box */}
            {stack.length > 0 && (
              <div className="md:w-56 shrink-0 space-y-2.5 p-4 rounded-2xl bg-[#22051F]/80 border border-[#F59879]/30 self-start">
                <p className="font-mono text-[10px] text-[#F59879] uppercase tracking-widest font-semibold">
                  Stack Tecnológica
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((t: string) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-lg border border-[#F59879]/20 text-[#F9E6C1] bg-[#1C031A]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Cover / Showcase */}
        {displayImage ? (
          <div className="relative aspect-video w-full rounded-[28px] sm:rounded-[36px] border border-[#F59879]/30 overflow-hidden bg-[#22051F] shadow-[0_20px_50px_rgba(20,2,19,0.3)]">
            <Image
              src={displayImage}
              alt={project.title || ""}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        ) : (
          <div className="aspect-video w-full rounded-[28px] sm:rounded-[36px] border border-[#F59879]/30 flex flex-col items-center justify-center bg-gradient-to-br from-[#280624] to-[#1C031A] text-center p-8 text-[#F9E6C1]">
            <FolderGit2 className="w-16 h-16 text-[#F59879]/60 mb-3" />
            <h2 className="font-display font-bold text-2xl text-white">
              {project.title}
            </h2>
            <p className="text-xs font-mono text-[#F59879] mt-1">
              Documentação e Arquitetura do Projeto
            </p>
          </div>
        )}

        {/* Content Article */}
        {project.content ? (
          <div className="rounded-[28px] sm:rounded-[36px] border border-[#F59879]/30 bg-gradient-to-br from-[#280624] to-[#1C031A] overflow-hidden text-[#F9E6C1] shadow-lg">
            <div className="px-6 py-4 border-b border-[#F59879]/20 bg-[#22051F]/80 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F59879]" />
              <p className="font-mono text-xs text-[#F59879] uppercase tracking-widest font-semibold">
                Detalhamento & Decisões de Engenharia
              </p>
            </div>
            <article
              className="p-6 sm:p-10 prose prose-invert max-w-none prose-p:text-[#F9E6C1]/90 prose-headings:text-white prose-a:text-[#F59879]"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        ) : (
          <div className="rounded-[28px] border border-[#F59879]/30 bg-gradient-to-br from-[#280624] to-[#1C031A] p-8 text-center text-[#F9E6C1]">
            <p className="text-sm font-mono text-[#F9E6C1]/70">
              Detalhamento arquitetural completo em desenvolvimento.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-[#F59879]/30 bg-[#22051F] text-[#F9E6C1]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between text-xs font-mono">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#F9E6C1] hover:text-[#FFF] transition-colors"
          >
            <ArrowLeft size={12} className="text-[#F59879]" /> Voltar ao portfólio
          </Link>
          <p>© {new Date().getFullYear()} · Luís Felipe Chiqueto</p>
        </div>
      </footer>
    </div>
  );
}
