import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  headline: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  birth_date: z.string().nullable().optional(),
  github_url: z.string().nullable().optional(),
  linkedin_url: z.string().nullable().optional(),
  instagram_url: z.string().nullable().optional(),
  resume_url: z.string().nullable().optional(),
  hero_image_url: z.string().nullable().optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
