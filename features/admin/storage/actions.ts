"use server"

import { createClient } from "@/lib/server"

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  try {
    const supabase = await createClient()
    
    // Check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { url: null, error: "Não autenticado" }
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: true,
      })

    if (error) {
      console.error("Storage upload error:", error)
      return { url: null, error: error.message }
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return { url: publicUrlData.publicUrl, error: null }
  } catch (error: any) {
    console.error("Exception during upload:", error)
    return { url: null, error: error.message || "Erro desconhecido" }
  }
}

export async function deleteFile(bucket: string, path: string): Promise<{ error: string | null }> {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: "Não autenticado" }
    }

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (error: any) {
    return { error: error.message || "Erro desconhecido" }
  }
}
