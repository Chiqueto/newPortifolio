import { z } from "zod"

export const technologySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  category: z.string().nullable().optional(),
  sort_order: z.number().default(0),
})

export type TechnologyFormValues = z.infer<typeof technologySchema>
