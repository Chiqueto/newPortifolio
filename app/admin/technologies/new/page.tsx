import { TechnologyForm } from "@/features/admin/technologies/components/technology-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewTechnologyPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Nova Tecnologia</h1></div>
      <Card><CardHeader><CardTitle>Detalhes da Tecnologia</CardTitle></CardHeader><CardContent><TechnologyForm /></CardContent></Card>
    </div>
  )
}
