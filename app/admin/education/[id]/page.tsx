import { EducationForm } from "@/features/admin/education/components/education-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"
import { DeleteEducationButton } from "./delete-button"

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: edu } = await supabase.from("education").select("*").eq("id", id).single()

  if (!edu) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Editar Formação</h1></div>
        <DeleteEducationButton id={edu.id} course={edu.course} />
      </div>

      <Card>
        <CardHeader><CardTitle>Detalhes da Formação</CardTitle></CardHeader>
        <CardContent><EducationForm initialData={edu} educationId={edu.id} /></CardContent>
      </Card>
    </div>
  )
}
