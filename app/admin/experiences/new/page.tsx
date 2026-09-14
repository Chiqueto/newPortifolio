import { ExperienceForm } from "@/features/admin/experiences/components/experience-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Nova Experiência</h1></div>
      <Card><CardHeader><CardTitle>Detalhes da Experiência</CardTitle></CardHeader><CardContent><ExperienceForm /></CardContent></Card>
    </div>
  )
}
