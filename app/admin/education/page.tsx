import { createClient } from "@/lib/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function EducationPage() {
  const supabase = await createClient()
  const { data: edus } = await supabase.from("education").select("*").order("sort_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Formação</h1></div>
        <Button asChild><Link href="/admin/education/new">Nova Formação</Link></Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Instituição</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Período</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!edus?.length && <TableRow><TableCell colSpan={4} className="text-center">Nenhuma formação.</TableCell></TableRow>}
            {edus?.map((edu) => (
              <TableRow key={edu.id}>
                <TableCell className="font-medium">{edu.institution}</TableCell>
                <TableCell>{edu.course}</TableCell>
                <TableCell>{edu.start_date || "N/A"} - {edu.current ? "Atual" : (edu.end_date || "N/A")}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild><Link href={`/admin/education/${edu.id}`}>Editar</Link></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
