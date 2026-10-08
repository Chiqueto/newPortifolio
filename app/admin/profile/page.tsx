import { ProfileForm } from "@/features/admin/profile/components/profile-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/server"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from("profile").select("*").limit(1).single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
        <p className="text-muted-foreground">Gerencie as informações pessoais do seu portfólio.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Perfil</CardTitle>
          <CardDescription>Essas informações serão exibidas publicamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm initialData={profile} profileId={profile?.id || null} />
        </CardContent>
      </Card>
    </div>
  )
}
