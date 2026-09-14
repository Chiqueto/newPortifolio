import { EducationForm } from "@/features/admin/education/components/education-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewEducationPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Nova Formação</h1></div>
      <Card><CardHeader><CardTitle>Detalhes da Formação</CardTitle></CardHeader><CardContent><EducationForm /></CardContent></Card>
    </div>
  )
}
