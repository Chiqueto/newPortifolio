"use server"

import { createClient } from "@/lib/server"
import { experienceSchema, ExperienceFormValues } from "./schemas"
import { revalidatePath } from "next/cache"

export async function createExperience(data: ExperienceFormValues, logoUrl?: string | null) {
  const supabase = await createClient()

  const parsed = experienceSchema.safeParse(data)
  if (!parsed.success) {
    return { error: "Dados inválidos." }
  }

  const values = parsed.data

  const { error } = await supabase.from("experiences").insert({
    company: values.company,
    role: values.role,
    description: values.description || null,
    start_date: values.start_date,
    end_date: values.end_date || null,
    current: values.current,
    sort_order: values.sort_order,
    company_logo_url: logoUrl || null,
  })

  if (error) return { error: error.message }

  revalidatePath("/admin/experiences")
  return { success: true }
}

export async function updateExperience(id: string, data: ExperienceFormValues, logoUrl?: string | null) {
  const supabase = await createClient()

  const parsed = experienceSchema.safeParse(data)
  if (!parsed.success) return { error: "Dados inválidos." }

  const values = parsed.data
  const updateData: any = {
    company: values.company,
    role: values.role,
    description: values.description || null,
    start_date: values.start_date,
    end_date: values.end_date || null,
    current: values.current,
    sort_order: values.sort_order,
  }
  if (logoUrl !== undefined) updateData.company_logo_url = logoUrl

  const { error } = await supabase.from("experiences").update(updateData).eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/experiences")
  revalidatePath(`/admin/experiences/${id}`)
  return { success: true }
}

export async function deleteExperience(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("experiences").delete().eq("id", id)
  if (error) return { error: error.message }

  revalidatePath("/admin/experiences")
  return { success: true }
}
