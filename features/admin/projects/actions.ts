"use server"

import { createClient } from "@/lib/server"
import { projectSchema, ProjectFormValues } from "./schemas"
import { revalidatePath } from "next/cache"

export async function createProject(data: ProjectFormValues, coverImageUrl?: string | null) {
  const supabase = await createClient()

  // Validate server-side
  const parsed = projectSchema.safeParse(data)
  if (!parsed.success) {
    return { error: "Dados inválidos." }
  }

  const values = parsed.data
  
  const { error } = await supabase.from("projects").insert({
    title: values.title,
    slug: values.slug,
    short_description: values.short_description || null,
    description: values.description || null,
    status: values.status,
    project_type: values.project_type || null,
    featured: values.featured,
    published: values.published,
    repository_url: values.repository_url || null,
    live_url: values.live_url || null,
    start_date: values.start_date || null,
    end_date: values.end_date || null,
    sort_order: values.sort_order,
    cover_image_url: coverImageUrl || null,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/projects")
  return { success: true }
}

export async function updateProject(id: string, data: ProjectFormValues, coverImageUrl?: string | null) {
  const supabase = await createClient()

  const parsed = projectSchema.safeParse(data)
  if (!parsed.success) {
    return { error: "Dados inválidos." }
  }

  const values = parsed.data

  const updateData: any = {
    title: values.title,
    slug: values.slug,
    short_description: values.short_description || null,
    description: values.description || null,
    status: values.status,
    project_type: values.project_type || null,
    featured: values.featured,
    published: values.published,
    repository_url: values.repository_url || null,
    live_url: values.live_url || null,
    start_date: values.start_date || null,
    end_date: values.end_date || null,
    sort_order: values.sort_order,
  }

  if (coverImageUrl !== undefined) {
    updateData.cover_image_url = coverImageUrl
  }

  const { error } = await supabase.from("projects").update(updateData).eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/projects")
  revalidatePath(`/admin/projects/${id}`)
  return { success: true }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/projects")
  return { success: true }
}
