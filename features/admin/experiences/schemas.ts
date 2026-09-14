import { z } from "zod"

export const experienceSchema = z.object({
  company: z.string().min(1, "Empresa é obrigatória"),
  role: z.string().min(1, "Cargo é obrigatório"),
  description: z.string().optional(),
  start_date: z.string().min(1, "Data de início é obrigatória"),
  end_date: z.string().optional().or(z.literal("")),
  current: z.boolean().default(false),
  sort_order: z.number().default(0),
})

export type ExperienceFormValues = z.infer<typeof experienceSchema>
