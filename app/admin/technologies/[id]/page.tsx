import { TechnologyForm } from "@/features/admin/technologies/components/technology-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"
import { DeleteTechnologyButton } from "./delete-button"

export default async function EditTechnologyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: tech } = await supabase.from("technologies").select("*").eq("id", id).single()

  if (!tech) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Editar Tecnologia</h1></div>
        <DeleteTechnologyButton id={tech.id} name={tech.name} />
      </div>

      <Card>
        <CardHeader><CardTitle>Detalhes da Tecnologia</CardTitle></CardHeader>
        <CardContent><TechnologyForm initialData={tech} technologyId={tech.id} /></CardContent>
      </Card>
    </div>
  )
}
