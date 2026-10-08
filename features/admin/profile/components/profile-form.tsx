"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { profileSchema, ProfileFormValues } from "../schemas"
import { updateProfile } from "../actions"
import { uploadFile } from "../../storage/actions"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ProfileForm({ initialData, profileId }: { initialData?: any; profileId: string | null }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [heroFile, setHeroFile] = useState<File | null>(null)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as any,
    defaultValues: initialData || {
      name: "",
      headline: "",
      bio: "",
      email: "",
      phone: "",
      location: "",
      birth_date: "",
      github_url: "",
      linkedin_url: "",
      instagram_url: "",
      resume_url: "",
      hero_image_url: "",
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    let avatarUrl = initialData?.avatar_url
    if (avatarFile) {
      const ext = avatarFile.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      const { url, error } = await uploadFile("portfolio", `profile/avatar/${fileName}`, avatarFile)
      if (error) {
        toast.error("Erro no upload", { description: error })
        setIsLoading(false)
        return
      }
      avatarUrl = url
    }

    let heroUrl = initialData?.hero_image_url
    if (heroFile) {
      const ext = heroFile.name.split('.').pop()
      const fileName = `${Date.now()}_hero.${ext}`
      const { url, error } = await uploadFile("portfolio", `profile/hero/${fileName}`, heroFile)
      if (error) {
        toast.error("Erro no upload", { description: error })
        setIsLoading(false)
        return
      }
      heroUrl = url
    }

    const res = await updateProfile(profileId, data, avatarFile ? avatarUrl : undefined, heroFile ? heroUrl : undefined)

    if (res.error) {
      toast.error("Erro ao salvar", { description: res.error })
    } else {
      toast.success("Perfil salvo com sucesso!")
      router.refresh()
    }
    
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Nome</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="headline" render={({ field }) => (
            <FormItem><FormLabel>Headline</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>E-mail Público</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Telefone / WhatsApp</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="location" render={({ field }) => (
            <FormItem><FormLabel>Localização</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="birth_date" render={({ field }) => (
            <FormItem><FormLabel>Data de Nascimento</FormLabel><FormControl><Input type="date" {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <FormField control={form.control} name="bio" render={({ field }) => (
          <FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea className="h-32" {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
        )} />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField control={form.control} name="github_url" render={({ field }) => (
            <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="linkedin_url" render={({ field }) => (
            <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="instagram_url" render={({ field }) => (
            <FormItem><FormLabel>Instagram URL</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="resume_url" render={({ field }) => (
            <FormItem><FormLabel>Currículo (Link)</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <div className="space-y-2">
          <FormLabel>Avatar</FormLabel>
          {initialData?.avatar_url && !avatarFile && (
            <div className="mb-2"><img src={initialData.avatar_url} alt="Avatar" className="h-32 w-32 object-cover rounded-full border" /></div>
          )}
          <Input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} />
        </div>

        <div className="space-y-2">
          <FormLabel>Foto da Home (Canto Direito)</FormLabel>
          {initialData?.hero_image_url && !heroFile && (
            <div className="mb-2"><img src={initialData.hero_image_url} alt="Hero Image" className="h-48 w-32 object-cover rounded border border-border" /></div>
          )}
          <Input type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files?.[0] || null)} />
        </div>

        <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Perfil"}</Button>
      </form>
    </Form>
  )
}
