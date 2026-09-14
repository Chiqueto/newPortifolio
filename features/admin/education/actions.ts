"use server"

import { createClient } from "@/lib/server"
import { educationSchema, EducationFormValues } from "./schemas"
import { revalidatePath } from "next/cache"

export async function createEducation(data: EducationFormValues) {
  const supabase = await createClient()

  const parsed = educationSchema.safeParse(data)
  if (!parsed.success) return { error: "Dados inválidos." }

  const values = parsed.data

  const { error } = await supabase.from("education").insert({
    institution: values.institution,
    course: values.course,
    degree: values.degree || null,
    start_date: values.start_date || null,
    end_date: values.end_date || null,
    current: values.current,
    sort_order: values.sort_order,
  })

  if (error) return { error: error.message }

  revalidatePath("/admin/education")
  return { success: true }
}

export async function updateEducation(id: string, data: EducationFormValues) {
  const supabase = await createClient()

  const parsed = educationSchema.safeParse(data)
  if (!parsed.success) return { error: "Dados inválidos." }

  const values = parsed.data

  const { error } = await supabase.from("education").update({
    institution: values.institution,
    course: values.course,
    degree: values.degree || null,
    start_date: values.start_date || null,
    end_date: values.end_date || null,
    current: values.current,
    sort_order: values.sort_order,
  }).eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/education")
  revalidatePath(`/admin/education/${id}`)
  return { success: true }
}

export async function deleteEducation(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("education").delete().eq("id", id)
  if (error) return { error: error.message }

  revalidatePath("/admin/education")
  return { success: true }
}
