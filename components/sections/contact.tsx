"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  message: z.string().min(1, "Mensagem obrigatória"),
});

export default function Contact({ profile }: { profile?: any }) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });
  const [sending, setSending] = useState(false);

  const send = (values: z.infer<typeof schema>) => {
    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
    setSending(true);
    emailjs.send(serviceID!, templateID!, values, publicKey!).then(
      () => { toast.success("Mensagem enviada!"); form.reset(); setSending(false); },
      () => { toast.error("Erro ao enviar. Tente novamente."); setSending(false); }
    );
  };

  return (
    <div className="max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna esquerda — Info */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">
              Vamos trabalhar juntos?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Aberto a oportunidades em Backend, Full Stack e Engenharia de Software.
            </p>
          </div>

          {/* Links de contato */}
          <div className="space-y-2">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
              Links diretos
            </p>
            {profile?.email && (
              <Link href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-3 rounded border border-border bg-card hover:border-gold/50 hover:bg-gold-muted transition-all group">
                <FaEnvelope size={14} className="text-muted-foreground group-hover:text-gold transition-colors" />
                <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">{profile.email}</span>
              </Link>
            )}
            {profile?.phone && (
              <Link href={`https://wa.me/55${profile.phone.replace(/\D/g, "")}`} target="_blank"
                className="flex items-center gap-3 p-3 rounded border border-border bg-card hover:border-gold/50 hover:bg-gold-muted transition-all group">
                <FaWhatsapp size={14} className="text-muted-foreground group-hover:text-gold transition-colors" />
                <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">{profile.phone}</span>
              </Link>
            )}
            {profile?.linkedin_url && (
              <Link href={profile.linkedin_url} target="_blank"
                className="flex items-center gap-3 p-3 rounded border border-border bg-card hover:border-gold/50 hover:bg-gold-muted transition-all group">
                <FaLinkedin size={14} className="text-muted-foreground group-hover:text-gold transition-colors" />
                <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">LinkedIn</span>
              </Link>
            )}
            {profile?.github_url && (
              <Link href={profile.github_url} target="_blank"
                className="flex items-center gap-3 p-3 rounded border border-border bg-card hover:border-gold/50 hover:bg-gold-muted transition-all group">
                <FaGithub size={14} className="text-muted-foreground group-hover:text-gold transition-colors" />
                <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">GitHub</span>
              </Link>
            )}
          </div>
        </div>

        {/* Coluna direita — Formulário */}
        <div className="rounded border border-border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-surface">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Enviar mensagem
            </p>
          </div>
          <div className="p-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(send)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Nome</FormLabel>
                    <FormControl><Input placeholder="Seu nome" {...field} className="bg-surface border-border" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Email</FormLabel>
                    <FormControl><Input placeholder="email@exemplo.com" {...field} className="bg-surface border-border" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Mensagem</FormLabel>
                    <FormControl><Textarea placeholder="Como posso ajudar?" className="resize-none h-24 bg-surface border-border" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" disabled={sending} className="w-full font-mono bg-gold text-background hover:bg-gold/90 border-0">
                  {sending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</> : "Enviar →"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
