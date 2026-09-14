import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Overview({ profile }: { profile?: any }) {
  const github = profile?.github_url;
  const linkedin = profile?.linkedin_url;
  const bio = profile?.bio;

  return (
    <div className="space-y-12">
      {/* Label */}
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em]">01 / Overview</p>

      {/* Headline */}
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
          Software<br />
          <span className="text-muted-foreground font-light">Developer.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
          {bio || "Software across backend, web and mobile. Building systems that go to production."}
        </p>
      </div>

      {/* Stack chips */}
      <div className="flex flex-wrap gap-2">
        {["Java · Spring Boot", "React · Next.js", "React Native · Wear OS"].map((s) => (
          <span
            key={s}
            className="font-mono text-xs px-3 py-1.5 rounded border border-border text-muted-foreground bg-surface"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Currently + links */}
      <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border">
        <div className="font-mono text-xs space-y-0.5">
          <p className="text-muted-foreground uppercase tracking-wider">Currently @</p>
          <p className="text-foreground">Usina Alta Mogiana</p>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {github && (
            <Link href={github} target="_blank" aria-label="GitHub"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors font-mono">
              <FaGithub size={16} /> GitHub
            </Link>
          )}
          {linkedin && (
            <Link href={linkedin} target="_blank" aria-label="LinkedIn"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors font-mono">
              <FaLinkedin size={16} /> LinkedIn
            </Link>
          )}
          {profile?.resume_url && (
            <a href={profile.resume_url} target="_blank" download
              className="text-sm font-mono text-muted-foreground hover:text-gold transition-colors">
              CV ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
