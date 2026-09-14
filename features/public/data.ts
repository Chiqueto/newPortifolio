import { createClient } from "@/lib/server"

// Retorna o primeiro perfil encontrado
export async function getPublicProfile() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("profile").select("*").limit(1).single()
  if (error && error.code !== "PGRST116") {
    console.error("Erro ao buscar profile:", error.message)
  }
  return data
}

export async function getPublicProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
  if (error) {
    console.error("Erro ao buscar projects:", error.message)
  }
  return data || []
}

export async function getPublicExperiences() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false })
  if (error) {
    console.error("Erro ao buscar experiences:", error.message)
  }
  return data || []
}

export async function getPublicEducation() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("start_date", { ascending: false })
  if (error) {
    console.error("Erro ao buscar education:", error.message)
  }
  return data || []
}

export async function getPublicTechnologies() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("technologies")
    .select("*")
    .order("sort_order", { ascending: true })
  if (error) {
    console.error("Erro ao buscar technologies:", error.message)
  }
  return data || []
}
