import { z } from "zod"

export const educationSchema = z.object({
  institution: z.string().min(1, "Instituição é obrigatória"),
  course: z.string().min(1, "Curso é obrigatório"),
  degree: z.string().optional(),
  start_date: z.string().optional().or(z.literal("")),
  end_date: z.string().optional().or(z.literal("")),
  current: z.boolean().default(false),
  sort_order: z.number().default(0),
})

export type EducationFormValues = z.infer<typeof educationSchema>
