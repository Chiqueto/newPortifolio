"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
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
    <div className="space-y-10">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em]">05 / Contato</p>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Vamos trabalhar juntos?</h2>
        <p className="text-muted-foreground">
          Aberto a oportunidades em Backend, Full Stack e Engenharia de Software.
        </p>
      </div>

      {/* Quick contact links */}
      <div className="flex flex-wrap gap-4">
        {profile?.email && (
          <Link href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-gold transition-colors border border-border rounded px-3 py-2 bg-surface">
            <FaEnvelope size={14} /> {profile.email}
          </Link>
        )}
        {profile?.linkedin_url && (
          <Link href={profile.linkedin_url} target="_blank"
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-gold transition-colors border border-border rounded px-3 py-2 bg-surface">
            <FaLinkedin size={14} /> LinkedIn
          </Link>
        )}
        {profile?.github_url && (
          <Link href={profile.github_url} target="_blank"
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-gold transition-colors border border-border rounded px-3 py-2 bg-surface">
            <FaGithub size={14} /> GitHub
          </Link>
        )}
      </div>

      {/* Form */}
      <div className="border border-border rounded-lg bg-surface p-6 space-y-4">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Ou envie uma mensagem</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(send)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Nome</FormLabel>
                  <FormControl><Input placeholder="Seu nome" {...field} className="bg-background" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Email</FormLabel>
                  <FormControl><Input placeholder="email@exemplo.com" {...field} className="bg-background" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Mensagem</FormLabel>
                <FormControl><Textarea placeholder="Como posso ajudar?" className="resize-none h-28 bg-background" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={sending} className="font-mono">
                {sending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</> : "Enviar →"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
