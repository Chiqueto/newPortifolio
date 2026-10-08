"use server"

import { createClient } from "@/lib/server"
import { technologySchema, TechnologyFormValues } from "./schemas"
import { revalidatePath } from "next/cache"

export async function createTechnology(data: TechnologyFormValues, iconUrl?: string | null) {
  const supabase = await createClient()

  const parsed = technologySchema.safeParse(data)
  if (!parsed.success) return { error: "Dados inválidos." }

  const values = parsed.data

  const { error } = await supabase.from("technologies").insert({
    name: values.name,
    slug: values.slug,
    category: values.category || null,
    sort_order: values.sort_order,
    icon_url: iconUrl || null,
  })

  if (error) return { error: error.message }

  revalidatePath("/admin/technologies")
  return { success: true }
}

export async function updateTechnology(id: string, data: TechnologyFormValues, iconUrl?: string | null) {
  const supabase = await createClient()

  const parsed = technologySchema.safeParse(data)
  if (!parsed.success) return { error: "Dados inválidos." }

  const values = parsed.data

  const updateData: any = {
    name: values.name,
    slug: values.slug,
    category: values.category || null,
    sort_order: values.sort_order,
  }
  if (iconUrl !== undefined) updateData.icon_url = iconUrl

  const { error } = await supabase.from("technologies").update(updateData).eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/technologies")
  revalidatePath(`/admin/technologies/${id}`)
  return { success: true }
}

export async function deleteTechnology(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("technologies").delete().eq("id", id)
  if (error) return { error: error.message }

  revalidatePath("/admin/technologies")
  return { success: true }
}
