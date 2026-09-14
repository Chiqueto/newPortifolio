import { z } from "zod"

export const projectSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  slug: z.string().min(1, "O slug é obrigatório"),
  short_description: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["PRODUCTION", "PRE_PRODUCTION", "DEVELOPMENT", "ACADEMIC", "ARCHIVED"], {
    required_error: "Status é obrigatório",
  }),
  project_type: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  repository_url: z.string().url("URL inválida").optional().or(z.literal("")),
  live_url: z.string().url("URL inválida").optional().or(z.literal("")),
  start_date: z.string().optional().or(z.literal("")),
  end_date: z.string().optional().or(z.literal("")),
  sort_order: z.number().default(0),
})

export type ProjectFormValues = z.infer<typeof projectSchema>
