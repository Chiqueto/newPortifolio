import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  headline: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  birth_date: z.string().optional().or(z.literal("")),
  github_url: z.string().url("URL inválida").optional().or(z.literal("")),
  linkedin_url: z.string().url("URL inválida").optional().or(z.literal("")),
  instagram_url: z.string().url("URL inválida").optional().or(z.literal("")),
  resume_url: z.string().url("URL inválida").optional().or(z.literal("")),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
