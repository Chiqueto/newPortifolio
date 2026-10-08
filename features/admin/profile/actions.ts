"use server"

import { createClient } from "@/lib/server"
import { profileSchema, ProfileFormValues } from "./schemas"
import { revalidatePath } from "next/cache"

export async function updateProfile(id: string | null, data: ProfileFormValues, avatarUrl?: string | null, heroImageUrl?: string | null) {
  const supabase = await createClient()

  const parsed = profileSchema.safeParse(data)
  if (!parsed.success) return { error: "Dados inválidos." }

  const values = parsed.data

  const updateData: any = {
    name: values.name,
    headline: values.headline || null,
    bio: values.bio || null,
    email: values.email || null,
    phone: values.phone || null,
    location: values.location || null,
    birth_date: values.birth_date || null,
    github_url: values.github_url || null,
    linkedin_url: values.linkedin_url || null,
    instagram_url: values.instagram_url || null,
    resume_url: values.resume_url || null,
  }
  if (avatarUrl !== undefined) updateData.avatar_url = avatarUrl
  if (heroImageUrl !== undefined) updateData.hero_image_url = heroImageUrl

  if (id) {
    const { error } = await supabase.from("profile").update(updateData).eq("id", id)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from("profile").insert([updateData])
    if (error) return { error: error.message }
  }

  revalidatePath("/admin/profile")
  revalidatePath("/")
  return { success: true }
}
