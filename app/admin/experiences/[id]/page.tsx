import { ExperienceForm } from "@/features/admin/experiences/components/experience-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"
import { DeleteExperienceButton } from "./delete-button"

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: exp } = await supabase.from("experiences").select("*").eq("id", id).single()

  if (!exp) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Editar Experiência</h1></div>
        <DeleteExperienceButton id={exp.id} company={exp.company} />
      </div>

      <Card>
        <CardHeader><CardTitle>Detalhes da Experiência</CardTitle></CardHeader>
        <CardContent><ExperienceForm initialData={exp} experienceId={exp.id} /></CardContent>
      </Card>
    </div>
  )
}
