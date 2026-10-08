import { createClient } from "@/lib/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase.from("projects").select("*").order("sort_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground">Gerencie os projetos do seu portfólio.</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">Novo Projeto</Link>
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Publicado</TableHead>
              <TableHead>Destaque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!projects?.length && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                  Nenhum projeto encontrado.
                </TableCell>
              </TableRow>
            )}
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{project.status}</Badge>
                </TableCell>
                <TableCell>{project.published ? "Sim" : "Não"}</TableCell>
                <TableCell>{project.featured ? "Sim" : "Não"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/projects/${project.id}`}>Editar</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
