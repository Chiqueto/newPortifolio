import { createClient } from "@/lib/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function ExperiencesPage() {
  const supabase = await createClient()
  const { data: exps } = await supabase.from("experiences").select("*").order("sort_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Experiências</h1></div>
        <Button asChild><Link href="/admin/experiences/new">Nova Experiência</Link></Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Período</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!exps?.length && <TableRow><TableCell colSpan={4} className="text-center">Nenhuma experiência.</TableCell></TableRow>}
            {exps?.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell className="font-medium">{exp.company}</TableCell>
                <TableCell>{exp.role}</TableCell>
                <TableCell>{exp.start_date} - {exp.current ? "Atual" : exp.end_date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild><Link href={`/admin/experiences/${exp.id}`}>Editar</Link></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
