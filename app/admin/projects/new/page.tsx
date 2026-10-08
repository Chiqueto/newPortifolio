import { ProjectForm } from "@/features/admin/projects/components/project-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Novo Projeto</h1>
        <p className="text-muted-foreground">Crie um novo projeto para o seu portfólio.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  )
}
