import { z } from "zod"

export const projectSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  slug: z.string().min(1, "O slug é obrigatório"),
  short_description: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  status: z.enum(["PRODUCTION", "PRE_PRODUCTION", "DEVELOPMENT", "ACADEMIC", "ARCHIVED"], {
    required_error: "Status é obrigatório",
  }),
  project_type: z.string().min(1, "O tipo do projeto é obrigatório"),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  repository_url: z.string().nullable().optional(),
  live_url: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  sort_order: z.number().default(0),
})

export type ProjectFormValues = z.infer<typeof projectSchema>
