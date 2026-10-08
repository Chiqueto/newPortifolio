"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { experienceSchema, ExperienceFormValues } from "../schemas"
import { createExperience, updateExperience } from "../actions"
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
import { Checkbox } from "@/components/ui/checkbox"

export function ExperienceForm({ initialData, experienceId }: { initialData?: any; experienceId?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema) as any,
    defaultValues: initialData || {
      company: "",
      role: "",
      description: "",
      start_date: "",
      end_date: "",
      current: false,
      sort_order: 0,
    },
  })

  async function onSubmit(data: ExperienceFormValues) {
    setIsLoading(true)

    let logoUrl = initialData?.company_logo_url
    if (logoFile) {
      const ext = logoFile.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      const { url, error } = await uploadFile("portfolio", `experiences/logos/${fileName}`, logoFile)
      if (error) {
        toast.error("Erro no upload", { description: error })
        setIsLoading(false)
        return
      }
      logoUrl = url
    }

    const res = experienceId 
      ? await updateExperience(experienceId, data, logoFile ? logoUrl : undefined)
      : await createExperience(data, logoUrl)

    if (res.error) {
      toast.error("Erro ao salvar", { description: res.error })
    } else {
      toast.success("Experiência salva com sucesso!")
      router.push("/admin/experiences")
      router.refresh()
    }
    
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField control={form.control} name="company" render={({ field }) => (
            <FormItem><FormLabel>Empresa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="role" render={({ field }) => (
            <FormItem><FormLabel>Cargo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="start_date" render={({ field }) => (
            <FormItem><FormLabel>Data Início</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="end_date" render={({ field }) => (
            <FormItem><FormLabel>Data Fim</FormLabel><FormControl><Input type="date" {...field} value={field.value || ""} disabled={form.watch("current")} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <FormField control={form.control} name="current" render={({ field }) => (
          <FormItem className="flex items-center gap-2 space-y-0">
            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            <FormLabel>Ocupação Atual</FormLabel>
          </FormItem>
        )} />

        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Descrição</FormLabel><FormControl><Textarea className="h-32" {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
        )} />

        <div className="space-y-2">
          <FormLabel>Logo da Empresa</FormLabel>
          {initialData?.company_logo_url && !logoFile && (
            <div className="mb-2"><img src={initialData.company_logo_url} alt="Logo" className="h-16 object-contain" /></div>
          )}
          <Input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
        </div>

        <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Experiência"}</Button>
      </form>
    </Form>
  )
}
