import { createClient } from "@/lib/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function TechnologiesPage() {
  const supabase = await createClient()
  const { data: techs } = await supabase.from("technologies").select("*").order("sort_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Tecnologias</h1></div>
        <Button asChild><Link href="/admin/technologies/new">Nova Tecnologia</Link></Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ícone</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!techs?.length && <TableRow><TableCell colSpan={4} className="text-center">Nenhuma tecnologia.</TableCell></TableRow>}
            {techs?.map((tech) => (
              <TableRow key={tech.id}>
                <TableCell>
                  {tech.icon_url ? <img src={tech.icon_url} alt={tech.name} className="h-8 w-8 object-contain" /> : "-"}
                </TableCell>
                <TableCell className="font-medium">{tech.name}</TableCell>
                <TableCell>{tech.category || "-"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild><Link href={`/admin/technologies/${tech.id}`}>Editar</Link></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
