import { ProjectForm } from "@/features/admin/projects/components/project-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"
import { DeleteProjectButton } from "./delete-button"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const supabase = await createClient()
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single()

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Projeto</h1>
          <p className="text-muted-foreground">{project.title}</p>
        </div>
        <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Projeto</CardTitle>
          <CardDescription>Atualize as informações do seu projeto.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm initialData={project} projectId={project.id} />
        </CardContent>
      </Card>
    </div>
  )
}
